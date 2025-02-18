package codksv.apirfds20242.Entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tcategory")
@Getter
@Setter
public class TCategory implements Serializable {
    @Id
    @Column(name = "idcategory")
    private String idcategory;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "state")
    private boolean state;
    
    @Column(name = "createdAt")
    private Date createdAt;

    @Column(name = "updatedAt")
    private Date updatedAt;
}