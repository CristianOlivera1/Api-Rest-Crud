package codksv.apirfds20242;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.mariadb.jdbc.MariaDbPoolDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class MariaDbConfig {
   
    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    @Bean
    DataSource dataSource() {
        MariaDbPoolDataSource dataSource = new MariaDbPoolDataSource();

        try {
            dataSource.setUrl(dbUrl);
            dataSource.setUser(dbUsername);
            dataSource.setPassword(dbPassword);
            System.out.println("Conectado a la base de datos");
        } catch(SQLException e) {
            e.printStackTrace();
        }

        return dataSource;
    }
}
