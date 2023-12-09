package dev.projectFinder.server.controllers;

import dev.projectFinder.server.components.Vacancy.UserInfo;
import dev.projectFinder.server.dtos.ProjectDTO;
import dev.projectFinder.server.dtos.VacancyDTO;
import dev.projectFinder.server.models.UnCompletedVacancy;
import dev.projectFinder.server.models.Project;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.services.ProjectService;
import dev.projectFinder.server.services.VacancyServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
@CrossOrigin("*")
@RestController
// localhost:8088/api/v1/skills
@RequestMapping("api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    @PostMapping("/create-project/{id}")
    public ResponseEntity<?> createProjectCtrl(@PathVariable String id, @RequestBody ProjectDTO projectDTO){
        HashMap<String, Object> response = new HashMap<>();
        try{
            Project project = projectService.createProject(id, projectDTO);
            response.put("project", project);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PutMapping("/update-project/{id}")
    public ResponseEntity<?> updateProjectCtrl(@PathVariable String id, @RequestBody ProjectDTO projectDTO){
        HashMap<String, Object> response = new HashMap<>();
        try{
            Project project = projectService.updateProject(id, projectDTO);
            response.put("project", project);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-all-project-user/{id}")
    public ResponseEntity<?> getAllProjectUser(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            List<Project> projects = projectService.getAllProjectUser(id);
            response.put("projects", projects);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllProject(){
        HashMap<String, Object> response = new HashMap<>();
        try{
            List<HashMap<String, Object>> projects = projectService.getAllProject();
            response.put("projects", projects);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-vacancies-project/{projectId}")
    public ResponseEntity<?> getVacanciesProject(@PathVariable String projectId){
        HashMap<String, Object> response = new HashMap<>();
        try{
            List<Vacancy> vacancies = projectService.getVacanciesProject(projectId);
            response.put("vacancies", vacancies);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-project-info/{projectId}")
    public ResponseEntity<?> getProjectInfo(@PathVariable String projectId){
        HashMap<String, Object> response = new HashMap<>();
        try{
            HashMap<String, Object> projectVacancies = projectService.getProjectInfo(projectId);
            response.put("res", projectVacancies);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @DeleteMapping("/delete-project/{id}")
    public ResponseEntity<?> deleteProjectCtrl(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            projectService.deleteProject(id);
            response.put("message", "Delete project successfully!");
            response.put("projectId", id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
