package dev.projectFinder.server.repositories;

import dev.projectFinder.server.models.Skill;
import dev.projectFinder.server.models.UnCompletedVacancy;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UnCompletedVacancyRepository extends MongoRepository<UnCompletedVacancy, ObjectId> {
}
