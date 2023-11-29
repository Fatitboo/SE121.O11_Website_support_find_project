package dev.projectFinder.server.controllers;

import dev.projectFinder.server.components.CVLink;
import dev.projectFinder.server.dtos.SeekerResumeDTO;
import dev.projectFinder.server.dtos.UserInforDTO;
import dev.projectFinder.server.dtos.UserLoginDTO;
import dev.projectFinder.server.dtos.UserDTO;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.responses.UserProfileResponse;
import dev.projectFinder.server.responses.UserResponse;
import dev.projectFinder.server.responses.UserResumeResponse;
import dev.projectFinder.server.services.EmailService;
import dev.projectFinder.server.services.UserServices;
import dev.projectFinder.server.utils.MessageKeys;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;

@CrossOrigin("*")
@RestController
// localhost:8088/api/v1/users
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserServices userServices;
    //  localhost:8088/api/v1/users/register/page=5&record=10
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO,
                                        BindingResult result){

        HashMap<String, Object> Response = new HashMap<>();
        if(result.hasErrors()){
            List<String> errMsgs = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            Response.put("message",errMsgs.toString());
            return ResponseEntity.badRequest().body(Response);
        }
        try {
            UserResponse newUser = userServices.createUser(userDTO);
            Response.put("message",MessageKeys.REGISTER_SUCCESSFULLY);
            Response.put("user",newUser);
            return  ResponseEntity.status(HttpStatus.CREATED).body(Response);
        }
        catch (Exception e){
            Response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Response);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login (@Valid @RequestBody UserLoginDTO userLoginDTO, BindingResult result) {
        // check login information and create token
        // return token response
        // this token is used to log in again if login
        HashMap<String, Object> loginResponse = new HashMap<>();

        if(result.hasErrors()){
            List<String> errMsgs = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            loginResponse.put("message",errMsgs.toString() );
            return ResponseEntity.badRequest().body(loginResponse);
        }
        try{
            UserResponse user = userServices.login(userLoginDTO);
            loginResponse.put("message",MessageKeys.LOGIN_SUCCESSFULLY );
            loginResponse.put("user",user);
            return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
        }catch (Exception e){
            loginResponse.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginResponse);
        }
    }

    @PutMapping("/update-user-information/{id}")
    public ResponseEntity<?> updateUserInformation( @PathVariable String id, @RequestBody UserInforDTO userInforDTO){
        HashMap<String, Object> response = new HashMap<>();
        try{
            if(userInforDTO.getActions()==1){
                userServices.updateSocialLink(id, userInforDTO);
                response.put("message",MessageKeys.UPDATE_SOCIAL_LINK_SUCCESSFULLY);
                return ResponseEntity.ok(response);
            }
            if(userInforDTO.getActions()==2){
                userServices.updateAddress(id, userInforDTO);
                response.put("message",MessageKeys.UPDATE_ADDRESS_SUCCESSFULLY);
                return ResponseEntity.ok(response);
            }
            if(userInforDTO.getActions()==3){
                userServices.updateUserInformation(id, userInforDTO);
                response.put("message",MessageKeys.UPDATE_INFORMATION_SUCCESSFULLY);
                return ResponseEntity.ok(response);
            }

        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        response.put("message","Action is not null");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    @PutMapping("/update-seeker-resume/{id}")
    public ResponseEntity<?> updateSeekerInformation( @PathVariable String id, @RequestBody SeekerResumeDTO seekerResumeDTO){
        HashMap<String, Object> response = new HashMap<>();
        try{
            userServices.updateSeekerInformation(id, seekerResumeDTO);
            response.put("message",MessageKeys.UPDATE_INFORMATION_SUCCESSFULLY);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PostMapping("/update-seeker-cv/{id}")
    public ResponseEntity<?> updateCVLinks(@PathVariable String id, @RequestParam("file") MultipartFile file){
        HashMap<String, Object> response = new HashMap<>();
        try{
            CVLink cv =   userServices.updateSeekerCV(id, file);
            response.put("message","Update Cv successfully" );
            response.put("cv",cv);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PostMapping("/update-image-user/{id}")
    public ResponseEntity<?> updateImages(@PathVariable String id, @RequestParam("file") MultipartFile file,@RequestParam("publicId") String publicId ){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user =  userServices.updateImages(id, file, publicId);
            response.put("message","Update image successfully" );
            response.put("image",user.getAvatar() );
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PostMapping("/delete-seeker-cv/{id}")
    public ResponseEntity<?> deleteCVLink(@PathVariable String id, @RequestParam("publicId") String publicId){
        HashMap<String, Object> response = new HashMap<>();
        try{
            userServices.deleteSeekerCV(id, publicId);
            response.put("message","Delete Cv successfully" );
            response.put("deleteId",publicId );

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-all-cv/{id}")
    public ResponseEntity<?> getAllCVs(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
           User user = userServices.getUserDetail(id);
            response.put("message","Get all Cv successfully" );
            response.put("cvLinks",user.getCvLinks() );
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-profile-user/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user = userServices.getUserDetail(id);
            UserProfileResponse userProfileResponse = UserProfileResponse.builder()
                    .avatar(user.getAvatar())
                    .fullName(user.getFullName())
                    .phoneNumber(user.getPhoneNumber())
                    .email(user.getEmail())
                    .dayOfBirth(user.getDayOfBirth())
                    .website(user.getWebsite())
                    .description(user.getDescription())
                    .fbLink(user.getFbLink())
                    .twLink(user.getTwLink())
                    .insLink(user.getInsLink())
                    .lkLink(user.getLkLink())
                    .address(user.getAddress())
                    .build();
           if (user.getUserType().equals("seeker")){
               userProfileResponse.setExpectSalary(user.getExpectSalary());
           }else {
               userProfileResponse.setTeamSize(user.getTeamSize());
           }
            response.put("message","Get user profile successfully" );
            response.put("userProfile",userProfileResponse);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-resume-user/{id}")
    public ResponseEntity<?> getUserResume(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user = userServices.getUserDetail(id);
            UserResumeResponse userResumeResponse = UserResumeResponse.builder()
                    .cvLinks(user.getCvLinks())
                    .jobDes(user.getJobDes())
                    .certificationUsers(user.getCertificationUsers())
                    .skillUsers(user.getSkillUsers())
                    .educationUsers(user.getEducationUsers())
                    .experienceUsers(user.getExperienceUsers())
                    .build();
            response.put("message","Get user profile successfully" );
            response.put("userResume",userResumeResponse);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-all-users")
    public ResponseEntity<?> getAllUser(){
        HashMap<String, Object> response = new HashMap<>();
        try{
            List<User> users = userServices.getAllUser();
            response.put("message","Get all users successfully" );
            response.put("users",users);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-user-by-id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user = userServices.getUserDetail(id);
            response.put("message","Get detail user successfully" );
            response.put("userDetail",user);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PostMapping("/send-token-verify-by-email/{id}")
    public ResponseEntity<?> sendTokenVerifyByEmail(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            String token = userServices.generateTokenVerifyAccount(id);
            response.put("message","Send email verify user successfully" );
            response.put("token",token);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PostMapping("/send-token-reset-by-email")
    public ResponseEntity<?> sendTokenResetByEmail(@RequestParam("username") String username){
        HashMap<String, Object> response = new HashMap<>();
        try{
            System.out.println("cc");
            String token = userServices.generateTokenResetPassword(username);
            response.put("message","Send email reset password user successfully" );
            response.put("token",token);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/update-token-verify")
    public ResponseEntity<?> updateVerifyAccount(@RequestParam("token") String token){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user = userServices.updateVerifyAccount(token);
            response.put("message","Verify account user successfully" );
            response.put("userVerify",user);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/update-token-reset")
    public ResponseEntity<?> updateResetPassword(@RequestParam("token") String token,@RequestParam("newPassword") String password){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user = userServices.updateResetPassword(token, password);
            response.put("message","Reset password user successfully" );
            response.put("userVerify",user);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
