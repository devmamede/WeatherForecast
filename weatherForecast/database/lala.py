import psycopg2
from psycopg2 import Error

def create_database():
        # Conectando ao PostgreSQL
        connection = psycopg2.connect(
            user="postgres",
            password="",
            host="localhost",
            port="5432"
        )
        connection.autocommit = True

        # Criando o cursor para executar comandos SQL
        cursor = connection.cursor()

        # Criando o banco de dados
        cursor.execute("CREATE DATABASE weather_forecast;")
        print("Banco de dados weather_forecast criado com sucesso.")

        # Fechando a conexão com o PostgreSQL
        cursor.close()
        connection.close()

def create_users_table():
    try:
        # Conectando ao PostgreSQL
        connection = psycopg2.connect(
            user="postgres",
            password="123456",
            host="localhost",
            port="5432",
            database="weather_forecast"
        )
        connection.autocommit = True

        # Criando o cursor para executar comandos SQL
        cursor = connection.cursor()

        # Criando a tabela users
        create_table_query = '''
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        '''
        cursor.execute(create_table_query)
        print("Tabela users criada com sucesso.")

        # Fechando a conexão com o PostgreSQL
        cursor.close()
        connection.close()

    except (Exception, Error) as error:
        print("Erro ao criar a tabela users:", error)

# Criar o banco de dados e a tabela
create_database()
create_users_table()
