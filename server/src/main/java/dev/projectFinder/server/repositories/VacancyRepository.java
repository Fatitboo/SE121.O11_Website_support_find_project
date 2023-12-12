package dev.projectFinder.server.repositories;

import dev.projectFinder.server.models.Vacancy;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VacancyRepository extends MongoRepository<Vacancy, ObjectId> {
    List<Vacancy> findByReportsNotNull();
}
