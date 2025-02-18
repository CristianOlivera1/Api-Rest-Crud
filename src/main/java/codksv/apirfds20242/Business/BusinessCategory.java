package codksv.apirfds20242.Business;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codksv.apirfds20242.Dto.DtoCategory;
import codksv.apirfds20242.Entity.TCategory;
import codksv.apirfds20242.Repository.RepoCategory;

import jakarta.transaction.Transactional;

@Service
public class BusinessCategory {
    @Autowired
    private RepoCategory repoCategory;
    
    @Transactional
	public void insert(DtoCategory dtoCategory) {
		dtoCategory.setIdcategory(UUID.randomUUID().toString());
        dtoCategory.setCreatedAt(new Date());
        dtoCategory.setUpdatedAt(new Date());

		TCategory tCategory = new TCategory();

		tCategory.setIdcategory(dtoCategory.getIdcategory());
        tCategory.setName(dtoCategory.getName());
        tCategory.setDescription(dtoCategory.getDescription());
        tCategory.setState(dtoCategory.isStatus());
		tCategory.setCreatedAt(dtoCategory.getCreatedAt());
		tCategory.setUpdatedAt(dtoCategory.getUpdatedAt());

		repoCategory.save(tCategory);
	}

    public DtoCategory getCategoryById(String idCategory) {
        Optional<TCategory> tCategory = repoCategory.findById(idCategory);

        if (!tCategory.isPresent()) {
            return null;
        }

        TCategory category = tCategory.get();
        DtoCategory dtoCategory = new DtoCategory();

        dtoCategory.setIdcategory(category.getIdcategory());
        dtoCategory.setName(category.getName());
        dtoCategory.setDescription(category.getDescription());
        dtoCategory.setStatus(category.isState());
        dtoCategory.setCreatedAt(category.getCreatedAt());
        dtoCategory.setUpdatedAt(category.getUpdatedAt());

        return dtoCategory;
    }

    public List<DtoCategory> getAll() {

        List<TCategory> listTCategory = repoCategory.findAll();
        List<DtoCategory> listDtoCategory = new ArrayList<>();

        for (TCategory item : listTCategory) {
            DtoCategory dtoCategory = new DtoCategory();

            dtoCategory.setIdcategory(item.getIdcategory());
            dtoCategory.setName(item.getName());
            dtoCategory.setDescription(item.getDescription());
            dtoCategory.setStatus(item.isState());
            dtoCategory.setCreatedAt(item.getCreatedAt());
            dtoCategory.setUpdatedAt(item.getUpdatedAt());

            listDtoCategory.add(dtoCategory);
        }

        return listDtoCategory;
    }

    @Transactional
    public boolean update(DtoCategory dtoCategory) {

        Optional<TCategory> tCategorys = repoCategory.findById(dtoCategory.getIdcategory());

        if (!tCategorys.isPresent()) {
            return false;
        }

        TCategory tCategory = tCategorys.get();
        tCategory.setName(dtoCategory.getName());
        tCategory.setDescription(dtoCategory.getDescription());
        tCategory.setState(dtoCategory.isStatus());
        tCategory.setUpdatedAt(new Date());
        repoCategory.save(tCategory);

        return true;
    }

    @Transactional
    public boolean delete(String idcategory) {
        Optional<TCategory> tCategory = repoCategory.findById(idcategory);

        if (tCategory.isPresent()) {
            repoCategory.deleteById(idcategory);
            return false;
        }

        return true;
    }
}