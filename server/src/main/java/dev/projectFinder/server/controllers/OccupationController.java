package dev.projectFinder.server.controllers;

import dev.projectFinder.server.dtos.OccupationDTO;
import dev.projectFinder.server.models.Occupation;
import dev.projectFinder.server.services.OccupationServices;
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
// localhost:8088/api/v1/occupations
@RequestMapping("api/v1/occupations")
@RequiredArgsConstructor
public class OccupationController {
    private final OccupationServices occupationServices;
    @GetMapping("")
    public ResponseEntity<?> getAllOccupations(){
        List<Occupation> Occupations = occupationServices.getAllOccupations();
        return ResponseEntity.ok(Occupations);
    }

    @GetMapping("search-occupation/{keyWord}")
    public ResponseEntity<?> searchOccupations(@PathVariable String keyWord){
        List<Occupation> Occupations = occupationServices.searchOccupations(keyWord);
        return ResponseEntity.ok(Occupations);
    }
    @PostMapping("")
    public ResponseEntity<?> createNewOccupation(@Valid @RequestBody OccupationDTO occupationDTO, BindingResult result){
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
            Occupation occupation = occupationServices.createNewOccupation(occupationDTO);
            response.put("message", MessageKeys.CREATE_OCCUPATION_SUCCESSFULLY);
            response.put("occupation",occupation);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateOccupationById(@PathVariable String id, @Valid @RequestBody OccupationDTO occupationDTO, BindingResult result){
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
            Occupation occupation =  occupationServices.updateOccupationById(id, occupationDTO);
            response.put("message", MessageKeys.UPDATE_OCCUPATION_SUCCESSFULLY);
            response.put("updateOccupation",occupation);
            return  ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOccupationById(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            occupationServices.deleteOccupation(id);
            response.put("message", MessageKeys.DELETE_OCCUPATION_SUCCESSFULLY);
            response.put("deleteId", id);
            return  ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message",e.getMessage() );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
