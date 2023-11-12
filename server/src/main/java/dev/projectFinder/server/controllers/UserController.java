package dev.projectFinder.server.controllers;

import dev.projectFinder.server.dtos.SeekerResumeDTO;
import dev.projectFinder.server.dtos.UserInforDTO;
import dev.projectFinder.server.dtos.UserLoginDTO;
import dev.projectFinder.server.dtos.UserDTO;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.responses.RegisterResponse;
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
import java.util.Map;

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

        RegisterResponse registerResponse = new RegisterResponse();
        if(result.hasErrors()){
            List<String> errMsgs = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            registerResponse.setMessage(errMsgs.toString());
            return ResponseEntity.badRequest().body(registerResponse);
        }
        try {
            User newUser = userServices.createUser(userDTO);
            registerResponse.setMessage(MessageKeys.REGISTER_SUCCESSFULLY);
            registerResponse.setUser(newUser);
            return  ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);
        }
        catch (Exception e){
            registerResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registerResponse);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login (@Valid @RequestBody UserLoginDTO userLoginDTO, BindingResult result) throws Exception {
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
            User user = userServices.login(userLoginDTO);
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

    @PutMapping("/update-seeker-information/{id}")
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
            userServices.updateSeekerCV(id, file);
            response.put("message","Update Cv successfully" );

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @DeleteMapping("/delete-seeker-cv/{id}")
    public ResponseEntity<?> deleteCVLink(@PathVariable String id, @RequestParam("publicId") String publicId){
        HashMap<String, Object> response = new HashMap<>();
        try{
            userServices.deleteSeekerCV(id, publicId);
            response.put("message","Delete Cv successfully" );

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


}
