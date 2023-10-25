package dev.projectFinder.server.controllers;

import dev.projectFinder.server.dtos.SocialLinkDTO;
import dev.projectFinder.server.dtos.UserInforDTO;
import dev.projectFinder.server.dtos.UserLoginDTO;
import dev.projectFinder.server.dtos.UserDTO;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.components.Address;
import dev.projectFinder.server.repositories.UserRepository;
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

import java.util.HashMap;
import java.util.List;

@RestController
// localhost:8088/api/v1/users
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServices userServices;
    private final UserRepository accountRepository;

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
        if (!userDTO.getPassword().equals(userDTO.getCPassword())){
            registerResponse.setMessage(MessageKeys.PASSWORD_NOT_MATCH);
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
    @PutMapping("/upd-social-link/{id}")
    public ResponseEntity<?> updateSocialLink( @PathVariable String id, @RequestBody SocialLinkDTO socialLinkDTO){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user = userServices.updateSocialLink(id, socialLinkDTO);
            response.put("message",MessageKeys.UPDATE_SOCIAL_LINK_SUCCESSFULLY);
            response.put("user", user);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/upd-address/{id}")
    public ResponseEntity<?> updateAddress( @PathVariable String id, @RequestBody Address address){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user = userServices.updateAddress(id, address);
            response.put("message",MessageKeys.UPDATE_ADDRESS_SUCCESSFULLY);
            response.put("user", user);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/upd-user-information/{id}")
    public ResponseEntity<?> updateUserInformation( @PathVariable String id, @RequestBody UserInforDTO userInforDTO){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user =  userServices.updateUserInformation(id, userInforDTO);
            response.put("message",MessageKeys.UPDATE_INFORMATION_SUCCESSFULLY);
            response.put("user", user);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
