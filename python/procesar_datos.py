import csv
import json
import requests
import ftplib
from pathlib import Path

# Configuración
CSV_FILE = 'interacciones.csv'
API_URL = 'https://webhook.site/b606f878-962c-4c18-a3f7-84c37eab794c' # Para prueba con webhook.site
#API_URL = 'https://api.ejemplo.com/subir-datos'  # Simulado
FTP_HOST = 'ftp.ejemplo.com'
FTP_USER = 'usuario'
FTP_PASS = 'contraseña'
FTP_DEST_PATH = '/interacciones/interacciones.csv'

# 1. Leer CSV y convertir cada fila a JSON
def leer_csv(filepath):
    datos = []
    with open(filepath, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for fila in reader:
            datos.append({
                "ClienteID": int(fila['ClienteID']),
                "Duracion": int(fila['Duracion']),
                "Resultado": fila['Resultado']
            })
    return datos

# 2. Enviar cada fila a la API simulada
def enviar_a_api(data):
    for item in data:
        try:
            response = requests.post(API_URL, json=item)
            response.raise_for_status()
            print(f"Enviado correctamente: {item}")
        except Exception as e:
            print(f"Error al enviar {item}: {e}")

# 3. Subir el CSV a un servidor FTP
def subir_a_ftp(filepath):
    try:
        with ftplib.FTP(FTP_HOST) as ftp:
            ftp.login(FTP_USER, FTP_PASS)
            with open(filepath, 'rb') as f:
                ftp.storbinary(f'STOR {FTP_DEST_PATH}', f)
        print(f"Archivo {filepath} subido exitosamente a FTP.")
    except Exception as e:
        print(f"Error al subir a FTP: {e}")

# 4. Ejecución principal
if __name__ == "__main__":
    if not Path(CSV_FILE).exists():
        print(f"Archivo {CSV_FILE} no encontrado.")
    else:
        datos = leer_csv(CSV_FILE)
        enviar_a_api(datos)
        subir_a_ftp(CSV_FILE)
