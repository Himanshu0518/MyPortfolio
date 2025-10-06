import sqlite3
import msgpack

# Connect to database
conn = sqlite3.connect("checkpoint.sqlite")
cur = conn.cursor()

# Fetch one row
cur.execute("SELECT checkpoint FROM checkpoints LIMIT 1")
blob_data = cur.fetchone()[0]
conn.close()

# Decode MessagePack
data = msgpack.unpackb(blob_data, raw=False)

# Extract the timestamp
timestamp = data['ts']
print(f"Timestamp: {timestamp}")