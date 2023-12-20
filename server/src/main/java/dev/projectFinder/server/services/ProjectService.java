package dev.projectFinder.server.services;

import dev.projectFinder.server.components.Notification;
import dev.projectFinder.server.components.RecentProject;
import dev.projectFinder.server.dtos.ProjectDTO;
import dev.projectFinder.server.models.Project;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.repositories.ProjectRepository;
import dev.projectFinder.server.repositories.UserRepository;
import dev.projectFinder.server.repositories.VacancyRepository;
import dev.projectFinder.server.utils.MessageKeys;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    private final UserServices userServices;
    private final VacancyServices vacancyServices;
    public List<HashMap<String, Object>> getAllProject ()throws Exception{

        List<Project> listProject = projectRepository.findAll();

        List<HashMap<String, Object>> result = new ArrayList<>();

        for(int i = 0; i < listProject.size(); i++){
            HashMap<String, Object> item = new HashMap<>();
            Optional<User> userOptional = userRepository.findById(listProject.get(i).getUserId());
            if(userOptional.isEmpty()){
                continue;
            }
            User user = userOptional.get();
            item.put("project", listProject.get(i));
            item.put("fullName", user.getFullName());
            item.put("avatar", user.getAvatar().getFileUrl());
            result.add(item);
        }
        return result;
    }
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
        userServices.increaseViews("6556ca3b5e265815afd0ffca");

        return project;
    }

    public Project updateProject(String id, ProjectDTO projectDTO) throws Exception {
        Optional<Project> projectOptional = projectRepository.findById(new ObjectId(id));
        if(projectOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get project in database");
        }
        Project project = projectOptional.get();

        project.setValue(projectDTO);
        projectRepository.save(project);

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
        if(listProjectIds != null)
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
        Optional<User> corInfoOpt = userRepository.findById(project.getUserId());


        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("project", project);
        hashMap.put("vacancies", vacancies);
        hashMap.put("corInfo", corInfoOpt.get());
        return hashMap;
    }

    public List<RecentProject> getAllProjects(){
        List<Project> projects =  projectRepository.findAll();
        List<RecentProject> recentProjects = new ArrayList<>();
        for (Project project: projects){
            User fUser = userRepository.findById(project.getUserId()).get();
            recentProjects.add(new RecentProject(project,
                    fUser.getFullName(),
                    fUser.getAvatar()!=null ? fUser.getAvatar().getFileUrl() : "https://pic.onlinewebfonts.com/thumbnails/icons_148020.svg",
                    fUser.getAddress()!=null ? fUser.getAddress().getProvince() : "No information"));
        }
        return recentProjects;
    }
    public void updateStatusProject(String id,String status){
        Optional<Project> projectOptional = projectRepository.findById(new ObjectId(id));
        if(projectOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get project in database!");
        }
        Project project=  projectOptional.get();
        project.setStatus(status);
        // set notification
        Optional<User> userOptional = userRepository.findById(project.getUserId());
        if(userOptional.isEmpty()) throw new DataIntegrityViolationException("Error when get user info in database!");
        User user = userOptional.get();
        List<Notification> notifications =  user.getNotifications();
        if(notifications == null) notifications = new ArrayList<>();
        String contentNoti = "Admin has been "+ status +" project "+project.getProjectName();
        notifications.add(new Notification(contentNoti, LocalDateTime.now()));
        user.setNotifications(notifications);

        // save to db
        userRepository.save(user);
        projectRepository.save(project);
    }

    public void deleteProject(String id) throws Exception{
        Optional<Project> projectOptional = projectRepository.findById(new ObjectId(id));
        if(projectOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get project in database");
        }
        Project project = projectOptional.get();
        projectRepository.deleteById(project.getProjectId());

        Optional<User> userOptional = userRepository.findById(project.getUserId());
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();

        List<String> projectIds = user.getProjects();

        projectIds.remove(project.getProjectId().toString());

        user.setProjects(projectIds);

        userRepository.save(user);
    }

    public List<Vacancy> getVacanciesProject(String projectId) throws Exception{
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
        return vacancies;
    }
    public Boolean updateFavoriteProject(String id, String projectId){
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        Optional<Project> projectOptional = projectRepository.findById(new ObjectId(projectId));
        if(projectOptional.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        Project project = projectOptional.get();
        Boolean isPush = true;

        // update favourite vacancy in user
        List<String> fvrProjects = user.getFavoriteProjects();
        if(fvrProjects==null){
            fvrProjects = new ArrayList<>();
        }
        if(fvrProjects.contains(projectId)){
            fvrProjects.remove(projectId);
            isPush = false;
        }
        else {
            fvrProjects.add(projectId);
        }


        // update favourite users in vacancy
        List<String> fvrUsers = project.getFavouriteUsers();
        if(fvrUsers==null){
            fvrUsers = new ArrayList<>();
        }
        if(fvrUsers.contains(id)){
            fvrUsers.remove(id);
        }
        else {
            fvrUsers.add(id);
        }
        // set + save
        project.setFavouriteUsers(fvrUsers);
        user.setFavoriteProjects(fvrProjects);

        userRepository.save(user);
        projectRepository.save(project);
        return isPush;
    }
    public List<HashMap<String, Object>> getAllFavouriteProjects(String userId){
        Optional<User> foundUser = userRepository.findById(new ObjectId(userId));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        List<String> fvrProjects = user.getFavoriteProjects();
        if(fvrProjects==null){
            fvrProjects = new ArrayList<>();
        }

        List<HashMap<String, Object>> result = new ArrayList<>();

        for(String projectId : fvrProjects){
            Optional<Project> optionalProject = projectRepository.findById(new ObjectId(projectId));
            if(optionalProject.isEmpty()) continue;
            Project project = optionalProject.get();
            HashMap<String, Object> item = new HashMap<>();

            Optional<User> userOptional = userRepository.findById(project.getUserId());
            if(userOptional.isEmpty()){
                continue;
            }
            User user1 = userOptional.get();
            item.put("project", project);
            item.put("fullName", user1.getFullName());
            item.put("avatar", user1.getAvatar().getFileUrl()!=null ? user1.getAvatar().getFileUrl():"https://pic.onlinewebfonts.com/thumbnails/icons_148020.svg");
            result.add(item);
        }

        return result;
    }

    public List<User> getParticipantsProject (String projectId){
        Optional<Project> projectOptional = projectRepository.findById(new ObjectId(projectId));
        if(projectOptional.isEmpty())   throw new DataIntegrityViolationException("Error when get project in database");
        Project project = projectOptional.get();
        ObjectId[] vacancyIds = project.getVacancies();
        List<User> participantsProject = new ArrayList<>();
        for (ObjectId vccId: vacancyIds ) {
            List<User> users = vacancyServices.getAllParticipantsVacancy(vccId.toString()).get("members");
            participantsProject.addAll(users);
        }
        return participantsProject;
    }
}
