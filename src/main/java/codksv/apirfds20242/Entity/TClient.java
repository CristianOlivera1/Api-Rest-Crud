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
@Table(name = "tclient")
@Getter
@Setter
public class TClient implements Serializable {
    @Id
    @Column(name = "idClient")
    private String idClient;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "surName")
    private String surName;

    @Column(name = "dni")
    private String dni;

    @Column(name = "gender")
    private Boolean gender; 

    @Column(name = "phone")
    private int phone;

    @Column(name = "address")
    private String address;

    @Column(name = "birthDate")
    private Date birthDate;

    @Column(name = "email")
    private String email;

    @Column(name = "createdAt")
    private Date createdAt;

    @Column(name = "updatedAt")
    private Date updatedAt;
}