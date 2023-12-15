package dev.projectFinder.server.repositories;

import dev.projectFinder.server.models.History;
import dev.projectFinder.server.models.Occupation;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HistoryRepository extends MongoRepository<History, ObjectId> {
}