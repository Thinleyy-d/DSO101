from app import app

client = app.test_client()

def test_home_math():
    assert 1 + 1 == 2

def test_home_route():
    response = client.get("/")
    assert response.status_code == 200

def test_home_content():
    response = client.get("/")
    data = response.get_json()
    assert "message" in data
    assert "status" in data
    assert data["status"] == "running"

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "healthy"

def test_add_numbers():
    response = client.get("/add/3/4")
    assert response.status_code == 200
    data = response.get_json()
    assert data["result"] == 7