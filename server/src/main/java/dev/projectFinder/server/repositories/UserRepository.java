package dev.projectFinder.server.repositories;

import dev.projectFinder.server.models.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Optional<User> findByTokenResetPassword(String tokenResetPassword);
    Optional<User> findByTokenVerify(String tokenVerify);



}
