package dev.projectFinder.server.repositories;

import dev.projectFinder.server.models.Occupation;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OccupationRepository extends MongoRepository<Occupation, ObjectId> {
    Boolean existsByOccupationName(String occupationName);
    Optional<Occupation> findOccupationByOccupationName(String occupationName);
}
