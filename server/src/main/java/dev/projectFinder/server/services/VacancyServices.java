package dev.projectFinder.server.services;

import dev.projectFinder.server.components.Vacancy.UserInfo;
import dev.projectFinder.server.dtos.UserDTO;
import dev.projectFinder.server.dtos.VacancyDTO;
import dev.projectFinder.server.models.UnCompletedVacancy;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.repositories.UnCompletedVacancyRepository;
import dev.projectFinder.server.repositories.UserRepository;
import dev.projectFinder.server.repositories.VacancyRepository;
import dev.projectFinder.server.responses.UserResponse;
import dev.projectFinder.server.utils.MessageKeys;
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
public class VacancyServices {
    private final UnCompletedVacancyRepository unCompletedVacancyRepository;
    private final VacancyRepository vacancyRepository;
    private final UserRepository userRepository;

    //GET
    public List<Vacancy> getAllVacancies(){
        return vacancyRepository.findAll();
    }
    //POST
    public String createJobId(UserInfo userInfo) throws Exception {
        Optional<User> userOptional = userRepository.findById(new ObjectId(userInfo.getUserId()));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();

        UnCompletedVacancy unCompletedVacancy = UnCompletedVacancy.builder().build();
        unCompletedVacancy.setUserInfo(userInfo);
        unCompletedVacancy.setFlag(0);

        String id = unCompletedVacancyRepository.save(unCompletedVacancy).getVacancyId().toString();

        List<String> vacanciesUser = new ArrayList<>();

        if(user.getUnCompletedVacancies() != null){
            vacanciesUser = user.getUnCompletedVacancies();
        }

        vacanciesUser.add(id);
        user.setUnCompletedVacancies(vacanciesUser);

        userRepository.save(user);
        return id;
    }
    public HashMap<Integer, Object> getCurrentJobComponent (String id) throws Exception{
        Optional<UnCompletedVacancy> unCompletedVacancyOptional = unCompletedVacancyRepository.findById(new ObjectId(id));
        if(unCompletedVacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Cann't find job in database");
        }
        UnCompletedVacancy unCompletedVacancy = unCompletedVacancyOptional.get();
        HashMap<Integer, Object> data = new HashMap<>();
        switch (unCompletedVacancy.getFlag()){
            case 0:
                data.put(unCompletedVacancy.getFlag(), unCompletedVacancy.getJobBasic());
                break;
            case 1:
                data.put(unCompletedVacancy.getFlag(), unCompletedVacancy.getJobDetail());
                break;
            case 2:
                data.put(unCompletedVacancy.getFlag(), unCompletedVacancy.getJobBenefit());
                break;
            case 3:
                data.put(unCompletedVacancy.getFlag(), unCompletedVacancy.getJobDes());
                break;
            case 4:
                data.put(unCompletedVacancy.getFlag(), unCompletedVacancy.getJobRef());
                break;
            case 5:
                data.put(unCompletedVacancy.getFlag(), unCompletedVacancy.getJobPreScreen());
                break;
        }
        return data;
    }
    public UnCompletedVacancy updateVacancyComponent(String id, VacancyDTO vacancyDTO) throws Exception{
        Optional<UnCompletedVacancy> unCompletedVacancyOptional = unCompletedVacancyRepository.findById(new ObjectId(id));
        if(unCompletedVacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Cann't find job in database");
        }

        UnCompletedVacancy unCompletedVacancy = unCompletedVacancyOptional.get();

        switch (vacancyDTO.getFlag()){
            case 0:
                unCompletedVacancy.setJobBasic(vacancyDTO.getJobBasic());
                break;
            case 1:
                unCompletedVacancy.setJobDetail(vacancyDTO.getJobDetail());
                break;
            case 2:
                unCompletedVacancy.setJobBenefit(vacancyDTO.getJobBenefit());
                break;
            case 3:
                unCompletedVacancy.setJobDes(vacancyDTO.getJobDes());
                break;
            case 4:
                unCompletedVacancy.setJobRef(vacancyDTO.getJobRef());
                break;
            case 5:
                unCompletedVacancy.setJobPreScreen(vacancyDTO.getJobPreScreen());
                break;
        }
        if(unCompletedVacancy.getFlag() < vacancyDTO.getFlag())
            unCompletedVacancy.setFlag(vacancyDTO.getFlag());
        unCompletedVacancyRepository.save(unCompletedVacancy);
        return unCompletedVacancy;
    }
    public Object getJobComponent(String id, int flag) throws Exception{
        Optional<UnCompletedVacancy> unCompletedVacancyOptional = unCompletedVacancyRepository.findById(new ObjectId(id));
        if(unCompletedVacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Cann't find job in database");
        }

        UnCompletedVacancy unCompletedVacancy = unCompletedVacancyOptional.get();
        Object jobComponent = new Object();
        switch (flag){
            case 0:
                jobComponent = unCompletedVacancy.getJobBasic();
                break;
            case 1:
                jobComponent = unCompletedVacancy.getJobDetail();
                break;
            case 2:
                jobComponent = unCompletedVacancy.getJobBenefit();
                break;
            case 3:
                jobComponent = unCompletedVacancy.getJobDes();
                break;
            case 4:
                jobComponent = unCompletedVacancy.getJobRef();
                break;
            case 5:
                jobComponent = unCompletedVacancy.getJobPreScreen();
                break;
        }
        return jobComponent;
    }
    public Vacancy createVacancy(String id){
        Optional<UnCompletedVacancy> unCompletedVacancyOptional = unCompletedVacancyRepository.findById(new ObjectId(id));

        if(unCompletedVacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get job in database");
        }
        UnCompletedVacancy unCompletedVacancy = unCompletedVacancyOptional.get();

        Optional<User> userOptional = userRepository.findById(new ObjectId(unCompletedVacancy.getUserInfo().getUserId()));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }

        User user = userOptional.get();
        Vacancy vacancy = new Vacancy(unCompletedVacancy);

        //remove unComplete vacancies


        String iD = String.valueOf(vacancyRepository.save(vacancy).getVacancyId());

        List<String> vacanciesUser = new ArrayList<>();

        if(user.getVacancies() != null){
            vacanciesUser = user.getVacancies();
        }

        vacanciesUser.add(iD);
        user.setVacancies(vacanciesUser);


        List<String> unCompleteVacanciesUser = user.getUnCompletedVacancies();
        unCompleteVacanciesUser.remove(unCompletedVacancy.getVacancyId().toString());
        user.setUnCompletedVacancies(unCompleteVacanciesUser);

        userRepository.save(user);

        unCompletedVacancyRepository.delete(unCompletedVacancy);
        return vacancy;
    }
    public Vacancy getVacancyById(String id){
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(id));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get job in database");
        }
        return vacancyOptional.get();
    }
    public void updateStatusVacancy(String id,String status){
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(id));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get vacancy in database!");
        }
        Vacancy vacancy=  vacancyOptional.get();
        vacancy.setApprovalStatus(status);
        if(status.equals("rejected")){
            vacancy.setPost(false);
        }
        vacancyRepository.save(vacancy);
    }
}
