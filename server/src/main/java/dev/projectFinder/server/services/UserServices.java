package dev.projectFinder.server.services;


import dev.projectFinder.server.dtos.SeekerResumeDTO;
import dev.projectFinder.server.dtos.UserDTO;
import dev.projectFinder.server.dtos.UserInforDTO;
import dev.projectFinder.server.dtos.UserLoginDTO;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.components.Address;
import dev.projectFinder.server.models.components.CVLink;
import dev.projectFinder.server.repositories.UserRepository;
import dev.projectFinder.server.utils.MessageKeys;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServices {
    private final UserRepository userRepository;
    private final UploadServices uploadServices;


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
    public void updateSocialLink(String id, UserInforDTO socialLinkDTO){
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        user.setFbLink(socialLinkDTO.getFbLink());
        user.setTwLink(socialLinkDTO.getTwLink());
        user.setInsLink(socialLinkDTO.getInsLink());
        user.setLkLink(socialLinkDTO.getLkLink());
        userRepository.save(user);
    }
    public void updateAddress(String id, UserInforDTO address){
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        user.setAddress(new Address(address.getProvince(), address.getDistrict(), address.getWard(), address.getAddressDetail()));
        userRepository.save(user);
    }
    public void updateUserInformation(String id, UserInforDTO userInforDTO){
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
        userRepository.save(user);
    }
    public void updateSeekerInformation(String id, SeekerResumeDTO seekerResumeDTO){
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        if(seekerResumeDTO.getActions()==1){
            user.setEducationUsers(seekerResumeDTO.getEducationUsers());
        }
        if(seekerResumeDTO.getActions()==2){
            user.setExperienceUsers(seekerResumeDTO.getExperienceUsers());
        }
        if(seekerResumeDTO.getActions()==3){
            user.setCertificationUsers(seekerResumeDTO.getCertificationUsers());
        }
        if(seekerResumeDTO.getActions()==4){
            user.setSkillUsers(seekerResumeDTO.getSkillUsers());
        }
        userRepository.save(user);
    }

    public void updateSeekerCV(String id, MultipartFile file) throws IOException {
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        Map<?,?> uploadResult = uploadServices.uploadFile(file);
        List<CVLink> cvLinks =  user.getCvLinks();
        if(cvLinks==null){
            cvLinks= new ArrayList<>();
        }
        cvLinks.add(new CVLink(file.getOriginalFilename(), (String) uploadResult.get("url"), (String) uploadResult.get("public_id"), false));
        user.setCvLinks(cvLinks);
         userRepository.save(user);
    }
    public void deleteSeekerCV(String id, String publicId) throws Exception {
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        List<CVLink> cvLinks =  user.getCvLinks();
        uploadServices.deleteFile(publicId);

        cvLinks.removeIf(cv -> cv.getPublicId().equals(publicId));

        user.setCvLinks(cvLinks);
        userRepository.save(user);
    }
    public User getUserDetail(String id) {
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }

        return foundUser.get();
    }


}
