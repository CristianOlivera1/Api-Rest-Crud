# Aplicación Web con Login (Spring Boot + Angular)

![Demostracion](https://github.com/CristianOlivera1/Resources-dev/blob/main/api-rest-crud/img/banner-shotso.png)

<div align="center">
    <img src="https://img.shields.io/badge/Java-32.9%25-brightgreen" alt="Java">
    <img src="https://img.shields.io/badge/TypeScript-32.4%25-orange" alt="TypeScript">
    <img src="https://img.shields.io/badge/HTML-32.1%25-yellow" alt="HTML">
    <img src="https://img.shields.io/badge/CSS-2.3%25-blue" alt="CSS">
    <img src="https://img.shields.io/badge/SCSS-0.3%25-purple" alt="SCSS">
</div>

## Descripción

Esta aplicación web implementa un **sistema de login** seguro con **Spring Boot** en el backend y **Angular** en el frontend. El backend maneja la autenticación y autorización de usuarios como tambien la gestión de diversas tabla a través de una API REST, mientras que el frontend consume estos servicios para gestionar el acceso a la aplicación.

## Funcionalidades

- **Inicio de Sesión y Registro de Usuarios**  
- **Gestión de API's REST** (Crea, lee, actualiza y elimina recursos a través de API's REST).
- **Autenticación con Tokens (JWT)**  
- **Consumo de API REST desde Angular**
- **Diseño Responsivo y Amigable**  
## 🛠️ Tecnologías Usadas

- **Frontend:** Angular, TypeScript, HTML, CSS  
- **Backend:** Spring Boot, Java, Spring Security, JWT  
- **Base de Datos:** MySQL  
- **Control de Versiones:** Git y GitHub

## Instalación
### 🔹 Backend (Spring Boot)
El backend esta en toda la carpeta raiz
1. Clona el repositorio:
    ```bash
    git clone https://github.com/CristianOlivera1/Api-Rest-Crud.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd Api-Rest-Crud
    ```
3. Instala las dependencias del backend:
    ```bash
    cd backend
    ./mvnw install
    ```
4. Configura tu base de datos en `application.properties`:
  ```properties
spring.application.name=Api-Rest-Crud
server.port= 8081
spring.jpa.hibernate.ddl-auto=none
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.generate-ddl=false
spring.jpa.properties.hibernate.hbm2ddl.auto=none
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
  ```
5. Configura tu base de datos en `MariaDBConfig.java`:
  ```java
public class MariaDbConfig {
    @Bean
	DataSource dataSource() {
		MariaDbPoolDataSource dataSource = new MariaDbPoolDataSource();

		try {
			dataSource.setUrl("jdbc:mariadb://localhost:3306/nombre_bd");

			dataSource.setUser("root");
			dataSource.setPassword("");
            System.out.println("conectado");
		} catch(SQLException e) {
			e.printStackTrace();
		}

		return dataSource;
	}
}
  ```
6. Inicia el backend:
    ```bash
    ./mvnw spring-boot:run
    ```
### 🔹 Frontend (Angular)
Esta ubicado en una carpeta llamada `frontend` en la raiz

7. Instala las dependencias del frontend:
    ```bash
    cd ../frontend
    npm install
    ```
8. Inicia el frontend:
    ```bash
    ng serve
    ```
## 🔑 Credenciales de Acceso
> [!IMPORTANT]
> Para ingresar a la aplicación, puedes usar las siguientes credenciales de prueba:

> - **Usuario**: `admin`
> - **Contraseña**: `12345678`

## 📸 Imágenes Principales
### 🔹 Login
![Detalle de Resultados](https://github.com/CristianOlivera1/Resources-dev/blob/main/api-rest-crud/img/login.png)  

## 📬 Resultado
**Aplicación**: [![Ver](https://img.shields.io/badge/VER-%23423bfb?logo=eye)](https://api-rest-crud.vercel.app/)
