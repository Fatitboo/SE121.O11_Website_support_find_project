package dev.projectFinder.server.repositories;

import dev.projectFinder.server.models.Skill;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface SkillRepository extends MongoRepository<Skill, ObjectId> {
    Boolean existsBySkillName(String skillName);
    Optional<Skill> findSkillBySkillName(String skillName);
}
