import sqlite3
import msgpack
from datetime import datetime, timedelta, timezone
import os 

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(ROOT_DIR, "checkpoint.sqlite")


def clear_old_checkpoints():
    """Remove checkpoints older than 1 day"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()

        # Get all checkpoints
        cur.execute("SELECT thread_id, checkpoint FROM checkpoints")
        rows = cur.fetchall()

        now = datetime.now(timezone.utc)
        threads_to_delete = set()

        for thread_id, blob_data in rows:
            try:
                # Decode MessagePack
                data = msgpack.unpackb(blob_data, raw=False)
                
                # Extract timestamp
                ts_str = data.get("ts")
                if not ts_str:
                    continue

                # Parse timestamp and ensure it's timezone-aware
                ts = datetime.fromisoformat(ts_str)
                
                # If timestamp is naive, make it UTC-aware
                if ts.tzinfo is None:
                    ts = ts.replace(tzinfo=timezone.utc)
                
                # Convert to UTC for comparison
                ts_utc = ts.astimezone(timezone.utc)
                
                # Check if older than 1 day
                age = now - ts_utc
                if age > timedelta(hours=12):
                    threads_to_delete.add(thread_id)
           
            except Exception as e:
                print(f"Error decoding checkpoint for thread {thread_id}: {e}")

        # Delete old threads
        deleted_count = 0
        for thread_id in threads_to_delete:
            cur.execute("DELETE FROM checkpoints WHERE thread_id = ?", (thread_id,))
            cur.execute("DELETE FROM writes WHERE thread_id = ?", (thread_id,))
            deleted_count += 1

        conn.commit()
        conn.close()

        print(f"Deleted {deleted_count} old conversation threads.")
        return deleted_count

    except Exception as e:
        print(f"Error during cleanup: {e}")
        return 0