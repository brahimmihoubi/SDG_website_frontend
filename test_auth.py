import requests

# 1. Login to get token
login_data = {"username": "admin", "password": "admin"} # assuming default admin/admin
resp = requests.post("http://localhost:8000/auth/login", data=login_data)
if resp.status_code != 200:
    print("Login failed:", resp.text)
    exit(1)

token = resp.json()["access_token"]
print("Got token")

# 2. Try to add a team
headers = {"Authorization": f"Bearer {token}"}
team_data = {"name": "media team", "icon": "Camera"}
resp2 = requests.post("http://localhost:8000/api/teams", json=team_data, headers=headers)
print("Create team response:", resp2.status_code)
print("Body:", resp2.text)
