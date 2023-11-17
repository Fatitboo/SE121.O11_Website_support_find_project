package dev.projectFinder.server.controllers;


import dev.projectFinder.server.dtos.SkillDTO;
import dev.projectFinder.server.models.Skill;
import dev.projectFinder.server.services.SkillServices;
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
@CrossOrigin("*")
@RestController
// localhost:8088/api/v1/skills
@RequestMapping("api/v1/skills")
@RequiredArgsConstructor
public class SkillController {
    private final SkillServices skillServices;
    @GetMapping("")
    public ResponseEntity<?> getAllSkills(){
        List<Skill> skills = skillServices.getAllSkills();
        return ResponseEntity.ok(skills);
    }
    @PostMapping("")
    public ResponseEntity<?> createNewSkill(@Valid @RequestBody SkillDTO skillDTO, BindingResult result){
        HashMap<String, Object> response = new HashMap<>();
        if(result.hasErrors()){
            List<String> errMsgs = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            response.put("message", errMsgs.toString());
            return ResponseEntity.badRequest().body(response);
        }
        try{
            Skill skill = skillServices.createNewSkill(skillDTO);
            response.put("message", MessageKeys.CREATE_SKILL_SUCCESSFULLY);
            response.put("skill",skill);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSkillById(@PathVariable String id, @Valid @RequestBody SkillDTO skillDTO, BindingResult result){
        HashMap<String, Object> response = new HashMap<>();
        if(result.hasErrors()){
            List<String> errMsgs = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            response.put("message", errMsgs.toString());
            return ResponseEntity.badRequest().body(response);
        }
        try{
            Skill skill =  skillServices.updateSkillById(id, skillDTO);
            response.put("message", MessageKeys.UPDATE_SKILL_SUCCESSFULLY);
            response.put("updateSkill",skill);
            return  ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkillById(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
           skillServices.deleteSkill(id);
            response.put("message", MessageKeys.DELETE_SKILL_SUCCESSFULLY);
            response.put("deleteId", id);
            return  ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
