package dev.projectFinder.server.services;


import dev.projectFinder.server.components.JwtTokenUtils;
import dev.projectFinder.server.dtos.SeekerResumeDTO;
import dev.projectFinder.server.dtos.UserDTO;
import dev.projectFinder.server.dtos.UserInforDTO;
import dev.projectFinder.server.dtos.UserLoginDTO;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.components.Address;
import dev.projectFinder.server.components.CVLink;
import dev.projectFinder.server.repositories.UserRepository;
import dev.projectFinder.server.responses.UserResponse;
import dev.projectFinder.server.utils.MessageKeys;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServices {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UploadServices uploadServices;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtils jwtTokenUtil;
    private final EmailService emailService;


    public UserResponse createUser(UserDTO userDTO) throws Exception {
        if (!userDTO.getPassword().equals(userDTO.getCPassword())){
            throw new Exception("Confirm password have to match password");
        }
        if(userRepository.existsByUsername(userDTO.getUsername())){
            throw new DataIntegrityViolationException("Username already exists");
        }

        User newAcc = User.builder()
                .username(userDTO.getUsername())
                .userType(userDTO.getUserType())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .fullName(userDTO.getFullName())
                .googleAccountId(userDTO.getGoogleAccountId())
                .isVerify(false)
                .isActive(true)
                .build();
        if ( userDTO.getGoogleAccountId() == 0) {
            String password = userDTO.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            newAcc.setPassword(encodedPassword);
        }
        User  user = userRepository.save(newAcc);
        UserResponse userResponse = UserResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .avatar(user.getAvatar())
                .userType(user.getUserType())
                .isActive(user.getIsActive())
                .isVerify(user.getIsVerify())
                .token(null)
                .build();
        return userResponse;

    }
    public UserResponse login(UserLoginDTO userLoginDTO) throws Exception {
        Optional<User> optionalUser= userRepository.findByUsername(userLoginDTO.getUsername());
        if (optionalUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.WRONG_USERNAME_PASSWORD);
        }
        User user = optionalUser.get();
        //check password
        if (user.getGoogleAccountId() == 0) {
            if(!passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
                throw new BadCredentialsException(MessageKeys.WRONG_USERNAME_PASSWORD);
            }
        }
        if(!userLoginDTO.getUserType().equals(user.getUserType())){
            throw new BadCredentialsException(MessageKeys.WRONG_USERNAME_PASSWORD);
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userLoginDTO.getUsername(), userLoginDTO.getPassword(),
                user.getAuthorities()
        );

        //authenticate with Java Spring security
        authenticationManager.authenticate(authenticationToken);
        String token = jwtTokenUtil.generateToken(user);
        return UserResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .avatar(user.getAvatar())
                .userType(user.getUserType())
                .isActive(user.getIsActive())
                .isVerify(user.getIsVerify())
                .token(token)
                .build();
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
        user.setAddress(new Address(address.getCountry(),address.getProvince(), address.getDistrict(), address.getWard(), address.getAddressDetail()));
        userRepository.save(user);
    }
    public void updateUserInformation(String id, UserInforDTO userInforDTO){
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
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
        if(seekerResumeDTO.getActions()==5){
            user.setCvLinks(List.of(seekerResumeDTO.getCvLinks()));
            user.setJobDes(seekerResumeDTO.getDescriptionJob());
        }
        userRepository.save(user);
    }

    public CVLink updateSeekerCV(String id, MultipartFile file) throws IOException {
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
        CVLink cv = new CVLink(UUID.randomUUID().toString(),file.getOriginalFilename(), (String) uploadResult.get("url"), (String) uploadResult.get("public_id"), false);
        cvLinks.add(cv);
        user.setCvLinks(cvLinks);
          userRepository.save(user);
          return cv;
    }
    public User updateImages(String id, MultipartFile file, String publicId) throws Exception {
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        Map<?,?> uploadResult = uploadServices.uploadFile(file);
        if(publicId.isEmpty()){
            uploadServices.deleteFile(publicId);
        }
        user.setAvatar(new CVLink(UUID.randomUUID().toString(), file.getOriginalFilename(), (String) uploadResult.get("url"), (String) uploadResult.get("public_id"), false));
        return userRepository.save(user);
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
    public List<User> getAllUser(){
        return userRepository.findAll();
    }
    public String generateTokenVerifyAccount(String id) throws IOException {
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User  user = foundUser.get();
        String verifyToken = generateRandomToken();
        String hashedToken = hashToken(verifyToken);
        user.setTokenVerify(hashedToken);
        LocalDateTime now = LocalDateTime.now();
        // Thêm 10 phút
        LocalDateTime newDateTime = now.plusMinutes(10);
        user.setExpiredDateTokenVerify(newDateTime );
        userRepository.save(user);
        emailService.sendSingleEmail(user.getEmail(), "Verify account", hashedToken);

        return hashedToken;
    }
    public String generateTokenResetPassword(String username) throws IOException {
        Optional<User> foundUser = userRepository.findByUsername(username);
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User  user = foundUser.get();
        String verifyToken = generateRandomToken();
        String hashedToken = hashToken(verifyToken);
        user.setTokenResetPassword(hashedToken);
        LocalDateTime now = LocalDateTime.now();
        // Thêm 10 phút
        LocalDateTime newDateTime = now.plusMinutes(10);
        user.setExpiredDateTokenResetPassword(newDateTime);
        userRepository.save(user);
        emailService.sendSingleResetPasswordEmail(user.getEmail(), "Reset password", hashedToken);

        return hashedToken;
    }
    private String generateRandomToken() {
        byte[] randomBytes = new byte[32];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getEncoder().encodeToString(randomBytes);
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = digest.digest(token.getBytes());
            return bytesToHex(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing token", e);
        }
    }
    private String bytesToHex(byte[] bytes) {
        StringBuilder hexStringBuilder = new StringBuilder();
        for (byte aByte : bytes) {
            hexStringBuilder.append(String.format("%02x", aByte));
        }
        return hexStringBuilder.toString();
    }
    public User updateVerifyAccount(String token){
        Optional<User> foundUser = userRepository.findByTokenVerify(token);
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException("Token expires, try again later");
        }
        User user = foundUser.get();
        LocalDateTime now = LocalDateTime.now();
        if(now.isAfter(user.getExpiredDateTokenVerify())){
            throw new DataIntegrityViolationException("Token expires, try again later");
        }
        user.setTokenVerify(null);
        user.setExpiredDateTokenVerify(null);
        user.setIsVerify(true);
        return userRepository.save(user);
    }
    public User updateResetPassword(String token, String password){
        Optional<User> foundUser = userRepository.findByTokenResetPassword(token);
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException("Token expires, try again later");
        }
        User user = foundUser.get();
        LocalDateTime now = LocalDateTime.now();
        if(now.isAfter(user.getExpiredDateTokenResetPassword())){
            throw new DataIntegrityViolationException("Token expires, try again later");
        }
        user.setTokenResetPassword(null);
        user.setExpiredDateTokenResetPassword(null);
        
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }
}
