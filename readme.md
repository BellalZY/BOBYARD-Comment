## Tech Stack

- Frontend: React
- Backend: Django + Django REST Framework
- Database: PostgreSQL
- CSS: Basic styling

## create PostgreSql database
```bash
CREATE DATABASE comments_db;
CREATE USER comments_user WITH PASSWORD 'password123';
ALTER ROLE comments_user SET client_encoding TO 'utf8';
ALTER ROLE comments_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE comments_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE comments_db TO comments_user;

```


## under backend folder:

```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

pip install -r requirements.txt

python manage.py migrate

python manage.py load_comments

python manage.py runserver


```
## under frontend folder
```bash
npm install
npm start
```

The React app will run on http://localhost:3000 and the backend on http://localhost:8000.