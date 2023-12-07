package dev.projectFinder.server.services;

import dev.projectFinder.server.dtos.ProjectDTO;
import dev.projectFinder.server.models.Project;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.repositories.ProjectRepository;
import dev.projectFinder.server.repositories.UserRepository;
import dev.projectFinder.server.repositories.VacancyRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final VacancyRepository vacancyRepository;


    public Project createProject(String id, ProjectDTO projectDTO) throws Exception {
        Optional<User> userOptional = userRepository.findById(new ObjectId(id));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();

        Project project = Project.builder().build();

        project.initValue(projectDTO, id);

        String projecId = projectRepository.save(project).getProjectId().toString();

        List<String> projectIds = user.getProjects();

        if(projectIds == null){
            projectIds = new ArrayList<>();
        }

        projectIds.add(projecId);

        user.setProjects(projectIds);

        userRepository.save(user);

        return project;
    }

    public List<Project> getAllProjectUser(String id) throws Exception {
        Optional<User> userOptional = userRepository.findById(new ObjectId(id));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();

        List<Project> listProjects = new ArrayList<>();

        List<String> listProjectIds = user.getProjects();

        for (String listProjectId : listProjectIds) {
            Optional<Project> projectOptional = projectRepository.findById(new ObjectId(listProjectId));
            if (projectOptional.isEmpty()) {
                throw new DataIntegrityViolationException("Error when get project in database");
            }
            Project project = projectOptional.get();
            listProjects.add(project);
        }

        return listProjects;
    }

    public HashMap<String, Object> getProjectInfo(String projectId) throws Exception {
        Optional<Project> projectOptional = projectRepository.findById(new ObjectId(projectId));
        if(projectOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get project in database");
        }
        ProjectDTO project = new ProjectDTO(projectOptional.get());
        List<Vacancy> vacancies = new ArrayList<>();
        for(int i = 0; i < project.getVacancies().length; i++){
            Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(project.getVacancies()[i]));
            if(vacancyOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get vacancy in database");
            }
            Vacancy vacancy = vacancyOptional.get();
            vacancies.add(vacancy);
        }
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("project", project);
        hashMap.put("vacancies", vacancies);
        return hashMap;
    }
}
