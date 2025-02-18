package codksv.apirfds20242.Business;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codksv.apirfds20242.Dto.DtoProduct;
import codksv.apirfds20242.Entity.TCategory;
import codksv.apirfds20242.Entity.TProduct;
import codksv.apirfds20242.Repository.RepoCategory;
import codksv.apirfds20242.Repository.RepoProduct;
import jakarta.transaction.Transactional;

@Service
public class BusinessProduct {

    @Autowired
    private RepoProduct repoProduct;

    @Autowired
    private RepoCategory repoCategory;

    @Transactional
    public void insert(DtoProduct dtoProduct) {
        dtoProduct.setIdProduct(UUID.randomUUID().toString());
        dtoProduct.setCreatedAt(new Date());
        dtoProduct.setUpdatedAt(new Date());

        TProduct tProduct = new TProduct();

        tProduct.setIdProduct(dtoProduct.getIdProduct());
        
        // Obtener la categoría por ID y establecerla en el producto
        Optional<TCategory> category = repoCategory.findById(dtoProduct.getIdCategory());
        if (category.isPresent()) {
            tProduct.setIdCategory(category.get());
        } else {
            throw new RuntimeException("Categoría no encontrada");
        }

        tProduct.setName(dtoProduct.getName());
        tProduct.setBarcode(dtoProduct.getBarcode());
        tProduct.setSale_price(dtoProduct.getSale_price());
        tProduct.setStock(dtoProduct.getStock());
        tProduct.setState(dtoProduct.getState());
        tProduct.setCreatedAt(dtoProduct.getCreatedAt());
        tProduct.setUpdatedAt(dtoProduct.getUpdatedAt());

        repoProduct.save(tProduct);
    }

    public DtoProduct getProductById(String idProduct) {
        Optional<TProduct> tProduct = repoProduct.findById(idProduct);

        if (!tProduct.isPresent()) {
            return null;
        }

        TProduct product = tProduct.get();
        DtoProduct dtoProduct = new DtoProduct();

        dtoProduct.setIdProduct(product.getIdProduct());
        dtoProduct.setIdCategory(product.getIdCategory().getIdcategory());
        dtoProduct.setName(product.getName());
        dtoProduct.setBarcode(product.getBarcode());
        dtoProduct.setSale_price(product.getSale_price());
        dtoProduct.setStock(product.getStock());
        dtoProduct.setState(product.getState());
        dtoProduct.setCreatedAt(product.getCreatedAt());
        dtoProduct.setUpdatedAt(product.getUpdatedAt());

        return dtoProduct;
    }

    public List<DtoProduct> getAll() {
        List<TProduct> listTProduct = repoProduct.findAll();
        List<DtoProduct> listDtoProduct = new ArrayList<>();

        for (TProduct item : listTProduct) {
            DtoProduct dtoProduct = new DtoProduct();

            dtoProduct.setIdProduct(item.getIdProduct());
            dtoProduct.setIdCategory(item.getIdCategory().getIdcategory());
            dtoProduct.setName(item.getName());
            dtoProduct.setBarcode(item.getBarcode());
            dtoProduct.setSale_price(item.getSale_price());
            dtoProduct.setStock(item.getStock());
            dtoProduct.setState(item.getState());
            dtoProduct.setCreatedAt(item.getCreatedAt());
            dtoProduct.setUpdatedAt(item.getUpdatedAt());
            
            dtoProduct.setCategoryName(item.getIdCategory().getName());
            
            listDtoProduct.add(dtoProduct);
        }

        return listDtoProduct;
    }

    @Transactional
    public boolean update(DtoProduct dtoProduct) {
        Optional<TProduct> tProducts = repoProduct.findById(dtoProduct.getIdProduct());

        if (!tProducts.isPresent()) {
            return false;
        }

        TProduct tProduct = tProducts.get();
        tProduct.setName(dtoProduct.getName());
        tProduct.setBarcode(dtoProduct.getBarcode());
        tProduct.setSale_price(dtoProduct.getSale_price());
        tProduct.setStock(dtoProduct.getStock());
        tProduct.setState(dtoProduct.getState());
        tProduct.setUpdatedAt(new Date());

        // Obtener la categoría por ID y establecerla en el producto
        Optional<TCategory> category = repoCategory.findById(dtoProduct.getIdCategory());
        if (category.isPresent()) {
            tProduct.setIdCategory(category.get());
        } else {
            throw new RuntimeException("Categoría no encontrada");
        }

        repoProduct.save(tProduct);

        return true;
    }

    @Transactional
    public boolean delete(String idProduct) {
        Optional<TProduct> tProduct = repoProduct.findById(idProduct);

        if (tProduct.isPresent()) {
            repoProduct.deleteById(idProduct);
            return true;
        }

        return false;
    }
}