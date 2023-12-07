package dev.projectFinder.server.controllers;

import dev.projectFinder.server.components.Vacancy.UserInfo;
import dev.projectFinder.server.dtos.VacancyDTO;
import dev.projectFinder.server.models.UnCompletedVacancy;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.services.VacancyServices;
import dev.projectFinder.server.utils.MessageKeys;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
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
@RequestMapping("api/v1/vacancies")
@RequiredArgsConstructor
public class VacancyController
{
    private final VacancyServices vacancyServices;
    //GET
    @GetMapping("")
    public ResponseEntity<?> getAllVacancies(){
        HashMap<String, Object> response = new HashMap<>();
        try{
            List<Vacancy> vacancies = vacancyServices.getAllVacancies();
            response.put("vacancies", vacancies);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    //POSTING
    @GetMapping("/posting/{id}")
    public ResponseEntity<?> getCurrentJobComponent(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            HashMap<Integer, Object> currentJobComponent = vacancyServices.getCurrentJobComponent(id);
            response.put("flag", currentJobComponent.keySet().toArray()[0]);
            response.put("currentJobComponent", currentJobComponent.values().toArray()[0]);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/posting/{id}/{flag}")
    public ResponseEntity<?> getJobComponent(@PathVariable String id,@PathVariable int flag){
        HashMap<String, Object> response = new HashMap<>();
        try{
            Object currentJobComponent = vacancyServices.getJobComponent(id, flag);
            response.put("currentJobComponent", currentJobComponent);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PostMapping("/posting")
    public ResponseEntity<?> createJobComponentId(@Valid @RequestBody UserInfo userInfo, BindingResult result){
        HashMap<String, Object> response = new HashMap<>();
        try{
            String id = vacancyServices.createJobId(userInfo);
            response.put("id", id);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/posting/{id}")
    public ResponseEntity<?> updateJobComponent(@PathVariable String id, @Valid @RequestBody VacancyDTO vacancyDTO, BindingResult result){
        HashMap<String, Object> response = new HashMap<>();
        try{
            UnCompletedVacancy unCompletedVacancy = vacancyServices.updateVacancyComponent(id, vacancyDTO);
            response.put("unCompleteVacancy", unCompletedVacancy);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PostMapping("/post/{id}")
    public ResponseEntity<?> postFullVacancy(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            Vacancy vacancy = vacancyServices.createVacancy(id);
            response.put("vacancy", vacancy);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-vacancy-by-id/{id}")
    public ResponseEntity<?> getVacancyById(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            Vacancy vacancy = vacancyServices.getVacancyById(id);
            response.put("message","Get vacancy info successfully!");
            response.put("vacancyInfo", vacancy);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
