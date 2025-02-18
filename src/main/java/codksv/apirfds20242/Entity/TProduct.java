package codksv.apirfds20242.Entity;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tproduct")
@Getter
@Setter
public class TProduct implements Serializable {
    @Id
    @Column(name = "idProduct")
    private String idProduct;

    @ManyToOne
    @JoinColumn(name = "idCategory", referencedColumnName = "idCategory")
    private TCategory idCategory;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "barcode", nullable = false, length = 255)
    private String barcode;

    @Column(name = "sale_price", nullable = false)
    private Float sale_price;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Column(name = "state")
    private Boolean state;

    @Column(name = "createdAt")
    private Date createdAt;

    @Column(name = "updatedAt")
    private Date updatedAt;
}
