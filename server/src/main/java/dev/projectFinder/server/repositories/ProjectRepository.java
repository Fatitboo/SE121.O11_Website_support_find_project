package dev.projectFinder.server.repositories;

import dev.projectFinder.server.models.Project;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, ObjectId> {
    List<Project> findByReportsNotNull();
}
