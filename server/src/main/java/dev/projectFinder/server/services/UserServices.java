package dev.projectFinder.server.services;


import dev.projectFinder.server.dtos.SocialLinkDTO;
import dev.projectFinder.server.dtos.UserDTO;
import dev.projectFinder.server.dtos.UserInforDTO;
import dev.projectFinder.server.dtos.UserLoginDTO;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.components.Address;
import dev.projectFinder.server.repositories.UserRepository;
import dev.projectFinder.server.utils.MessageKeys;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServices {
    private final UserRepository userRepository;

    public User createUser(UserDTO userDTO) throws Exception {
        if (!userDTO.getPassword().equals(userDTO.getCPassword())){
            throw new Exception("Confirm password have to match password");
        }
        if(userRepository.existsByUsername(userDTO.getUsername())){
            throw new DataIntegrityViolationException("Username already exists");
        }

        User newAcc = User.builder()
                .username(userDTO.getUsername())
                .userType(userDTO.getUserType())
                .password(userDTO.getPassword())
                .fullName(userDTO.getFullName())
                .googleAccountId(userDTO.getGoogleAccountId())
                .isVerify(userDTO.getIsVerify())
                .build();
        return userRepository.save(newAcc);
    }
    public User login(UserLoginDTO userLoginDTO) {
        Optional<User> optionalUser= userRepository.findByUsername(userLoginDTO.getUsername());
        if (optionalUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.WRONG_USERNAME_PASSWORD);
        }
        User user = optionalUser.get();
        if(!((userLoginDTO.getPassword()).equals(user.getPassword()))){
            throw new DataIntegrityViolationException(MessageKeys.WRONG_USERNAME_PASSWORD);
        }
        return user;
    }
    public User updateSocialLink(String id, SocialLinkDTO socialLinkDTO){
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        user.setFbLink(socialLinkDTO.getFbLink());
        user.setTwLink(socialLinkDTO.getTwLink());
        user.setInsLink(socialLinkDTO.getInsLink());
        user.setLkLink(socialLinkDTO.getLkLink());
        return userRepository.save(user);
    }
    public User updateAddress(String id, Address address){
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        user.setAddress(address);
        return userRepository.save(user);
    }

    public User updateUserInformation(String id, UserInforDTO userInforDTO){
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        user.setAvatar(userInforDTO.getAvatar());
        user.setFullName(userInforDTO.getFullName());
        user.setPhoneNumber(userInforDTO.getPhoneNumber());
        user.setEmail(userInforDTO.getEmail());
        user.setDayOfBirth(userInforDTO.getDob());
        user.setDescription(userInforDTO.getDescription());
        user.setWebsite(userInforDTO.getWebsite());
        if((user.getUserType()).equals("seeker")){
            user.setExpectSalary(userInforDTO.getExpectSalary());
        }else user.setTeamSize(userInforDTO.getTeamSize());
        return  userRepository.save(user);

    }
}
