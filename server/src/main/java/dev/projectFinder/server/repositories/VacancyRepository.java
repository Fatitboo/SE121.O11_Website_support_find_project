package dev.projectFinder.server.repositories;

import dev.projectFinder.server.models.Vacancy;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VacancyRepository extends MongoRepository<Vacancy, ObjectId> {
}
