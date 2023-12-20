package dev.projectFinder.server.controllers;

import dev.projectFinder.server.components.Vacancy.JobPreScreen;
import dev.projectFinder.server.components.Vacancy.UserInfo;
import dev.projectFinder.server.dtos.VacancyDTO;
import dev.projectFinder.server.models.UnCompletedVacancy;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.services.UserServices;
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
            response.put("id", id);
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
    @GetMapping("/uncompleted-vacancy/{id}")
    public ResponseEntity<?> getFullUnCompletedVacancy(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            UnCompletedVacancy unCompletedVacancy = vacancyServices.getFullUnCompletedVacancy(id);
            response.put("unCompletedVacancy", unCompletedVacancy);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
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

    @PutMapping("/update-status-vacancy/{id}")
    public ResponseEntity<?> updateStatusVacancy(@PathVariable String id, @RequestParam("status") String status){
        HashMap<String, Object> response = new HashMap<>();
        try{
            vacancyServices.updateStatusVacancy(id, status);
            response.put("message","Update status vacancy successfully!");
            response.put("updateVacancyId", id);
            response.put("status", status);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @DeleteMapping("/delete-uncompleted-vacancy/{id}")
    public ResponseEntity<?> deleteUncompletedVacancy(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            vacancyServices.deleteUncompletedVacancy(id);
            response.put("message","Delete vacancy successfully!");
            response.put("id", id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-all-applicants-vacancy/{id}")
    public ResponseEntity<?> getAllApplicantsVacancy(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            List<User> users = vacancyServices.getAllApplicantsVacancy(id);
            response.put("message","Get all applicants vacancy successfully!");
            response.put("applicants", users);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-all-participant-vacancy/{id}")
    public ResponseEntity<?> getAllParticipantsVacancy(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            HashMap<String, List<User>> result = vacancyServices.getAllParticipantsVacancy(id);
            response.put("message","Get all participants vacancy successfully!");
            response.put("participants", result);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


    //Cập nhật trạng thái applicant
    @PostMapping("/accept-applicant-vacancy/{vacancyId}/{id}")
    public ResponseEntity<?> acceptApplicantVacancy(@PathVariable String vacancyId, @PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            vacancyServices.acceptApplicantVacancy(vacancyId, id);
            response.put("message","Get applicants answer successfully!");
            response.put("id", id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/remove-applicant-vacancy/{vacancyId}/{id}")
    public ResponseEntity<?> removeApplicantVacancy(@PathVariable String vacancyId, @PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            vacancyServices.removeApplicantVacancy(vacancyId, id);
            response.put("message","Remove applicants answer successfully!");
            response.put("id", id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/block-member-vacancy/{vacancyId}/{id}")
    public ResponseEntity<?> blockMemberVacancy(@PathVariable String vacancyId, @PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            vacancyServices.blockMemberVacancy(vacancyId, id);
            response.put("message","Block member answer successfully!");
            response.put("id", id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/recover-member-vacancy/{vacancyId}/{id}")
    public ResponseEntity<?> recoverMemberVacancy(@PathVariable String vacancyId, @PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            vacancyServices.recoverMemberVacancy(vacancyId, id);
            response.put("message","Recover member answer successfully!");
            response.put("id", id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/delete-block-member-vacancy/{vacancyId}/{id}")
    public ResponseEntity<?> deleteBlockMemberVacancy(@PathVariable String vacancyId, @PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            vacancyServices.deleteBlockMemberVacancy(vacancyId, id);
            response.put("message","Delete block member answer successfully!");
            response.put("id", id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/update-favourite-vacancy/{id}")
    public ResponseEntity<?> updateFavoriteVacancy(@RequestParam("vacancyId") String vacancyId, @PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            Boolean isPush =  vacancyServices.updateFavoriteVacancy(id ,vacancyId);
            response.put("message","Update favourite vacancy successfully" );
            response.put("userId",id );
            response.put("vacancyId",vacancyId );
            response.put("isPush",isPush );
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-favourite-vacancies/{id}")
    public ResponseEntity<?> getFavouriteVacancies(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            List<Vacancy> vacancies = vacancyServices.getAllFavouriteVacancies(id);
            response.put("message","Get favourite vacancies successfully" );
            response.put("favouriteVacancies",vacancies );
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-applied-vacancies/{id}")
    public ResponseEntity<?> getAppliedVacancies(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            List<HashMap<String, Object>> vacancies = vacancyServices.getAllAppliedVacancies(id);
            response.put("message","Get favourite vacancies successfully" );
            response.put("appliedVacancies",vacancies );
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
