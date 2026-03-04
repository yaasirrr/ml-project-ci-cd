
FROM python:3.8-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r mlproject/requirements.txt

RUN pip install gunicorn

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]