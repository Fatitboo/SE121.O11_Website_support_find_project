package dev.projectFinder.server.repositories;

import dev.projectFinder.server.models.Report;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends MongoRepository<Report, ObjectId> {
}
