import requests
import json
print(requests.post("http://localhost:8000/api/teams", json={"name": "test", "icon": "test"}).text)
