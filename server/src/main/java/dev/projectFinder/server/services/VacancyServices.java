package dev.projectFinder.server.services;

import dev.projectFinder.server.components.Notification;
import dev.projectFinder.server.components.Participant;
import dev.projectFinder.server.components.Vacancy.JobPreScreen;
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

import java.time.LocalDateTime;
import java.util.*;

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
                data.put(0, unCompletedVacancy.getJobBasic());
                break;
            case 1:
                data.put(1, unCompletedVacancy.getJobDetail());
                break;
            case 2:
                data.put(2, unCompletedVacancy.getJobBenefit());
                break;
            case 3:
                data.put(3, unCompletedVacancy.getJobDes());
                break;
            case 4:
                data.put(4, unCompletedVacancy.getJobRef());
                break;
            case 5:
                data.put(5, unCompletedVacancy.getJobPreScreen());
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
    public UnCompletedVacancy getFullUnCompletedVacancy(String id) throws Exception{
        Optional<UnCompletedVacancy> unCompletedVacancyOptional = unCompletedVacancyRepository.findById(new ObjectId(id));
            if(unCompletedVacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get job in database");
        }
        return unCompletedVacancyOptional.get();
    }
    public void deleteUncompletedVacancy(String id){
        Optional<UnCompletedVacancy> unCompletedVacancyOptional = unCompletedVacancyRepository.findById(new ObjectId(id));
        if(unCompletedVacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get job in database");
        }
        UnCompletedVacancy unCompletedVacancy = unCompletedVacancyOptional.get();
        String userId = unCompletedVacancy.getUserInfo().getUserId();

        Optional<User> userOptional = userRepository.findById(new ObjectId(userId));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();

        List<String> unCompletedVacancyIds = user.getUnCompletedVacancies();
        unCompletedVacancyIds.remove(unCompletedVacancy.getVacancyId().toString());
        user.setUnCompletedVacancies(unCompletedVacancyIds);

        userRepository.save(user);
        unCompletedVacancyRepository.deleteById(unCompletedVacancy.getVacancyId());
    }
    public void updateStatusVacancy(String id,String status){
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(id));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get vacancy in database!");
        }
        Vacancy vacancy=  vacancyOptional.get();
        vacancy.setApprovalStatus(status);
        if(status.equals("rejected") ||status.equals("blocked") ){
            vacancy.setPost(false);
        }
        Optional<User> userOptional = userRepository.findById(new ObjectId(vacancy.getUserInfo().getUserId()));
        if(userOptional.isEmpty()) throw new DataIntegrityViolationException("Error when get user info in database!");
        User user = userOptional.get();
        List<Notification> notifications =  user.getNotifications();
        if(notifications == null) notifications = new ArrayList<>();
        String contentNoti = "Admin has been "+ status +" vacancy "+vacancy.getVacancyName();
        notifications.add(new Notification(contentNoti, LocalDateTime.now()));
        user.setNotifications(notifications);
        vacancyRepository.save(vacancy);
        userRepository.save(user);
    }
    public List<User> getAllApplicantsVacancy (String id) {
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(id));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get vacancy in database!");
        }
        Vacancy vacancy=  vacancyOptional.get();

        List<String> userIds = vacancy.getRegistants();
        List<User> users = new ArrayList<>();
        for(int i = 0; i < userIds.size(); i++){
            Optional<User> userOptional = userRepository.findById(new ObjectId(userIds.get(i)));
            if(userOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get user in database!");
            }
            users.add(userOptional.get());
        }

        return users;
    }
    public HashMap<String, List<User>> getAllParticipantsVacancy (String id) {
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(id));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get vacancy in database!");
        }
        Vacancy vacancy = vacancyOptional.get();

        List<Participant> userIds = vacancy.getParticipants();

        HashMap<String, List<User>> hm = new HashMap<>();

        List<User> members = new ArrayList<>();
        List<User> oldMembers = new ArrayList<>();
        if(userIds != null)
            for (Participant userId : userIds) {
                Optional<User> userOptional = userRepository.findById(new ObjectId(userId.getUserId()));
                if (userOptional.isEmpty()) {
                    throw new DataIntegrityViolationException("Error when get user in database!");
                }
                if(Objects.equals(userId.getStatus(), "received")) members.add(userOptional.get());
                if(Objects.equals(userId.getStatus(), "block")) oldMembers.add(userOptional.get());
            }

            hm.put("members", members);
            hm.put("oldMembers", oldMembers);
            return hm;
        }

    //Thay doi trang thai participate vacancy
    public void acceptApplicantVacancy(String vacancyId, String id) throws Exception{
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(vacancyId));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get vacancy in database!");
        }
        Vacancy vacancy = vacancyOptional.get();
        Optional<User> userOptional = userRepository.findById(new ObjectId(id));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();

        // Them mot participant moi -> vacancy
        List<Participant> listParticipantsVacancy = vacancy.getParticipants();

        if(listParticipantsVacancy == null || listParticipantsVacancy.isEmpty()){
            listParticipantsVacancy = new ArrayList<>();
        }
        Participant newPati = new Participant();
        newPati.setUserId(id);
        newPati.setReceiveTime(LocalDateTime.now());
        newPati.setStatus("received");
        listParticipantsVacancy.add(newPati);
        vacancy.setParticipants(listParticipantsVacancy);

        //Xoa bot 1 register
        List<String> registerVacancy = vacancy.getRegistants();
        registerVacancy.remove(user.getUserId().toString());
        vacancy.setRegistants(registerVacancy);


        // Them moi mot recreived vacancy -> user
        List<String> listReceivedVacancy = user.getReceivedVacancies();
        if(listReceivedVacancy == null || listReceivedVacancy.isEmpty()) {
            listReceivedVacancy = new ArrayList<>();
        }
        listReceivedVacancy.add(vacancy.getVacancyId().toString());
        user.setReceivedVacancies(listReceivedVacancy);

        // Xoa di mot applicant vacancy -> use
        List<String> listApplicantVacancy = user.getAppliedVacancies();
        listApplicantVacancy.remove(vacancy.getVacancyId().toString());
        user.setAppliedVacancies(listApplicantVacancy);

        //Xoa cau tra loi cua user
        JobPreScreen[] jobPreScreen = vacancy.getJobPreScreen();
        for (JobPreScreen preScreen : jobPreScreen) {
            HashMap<Object, Object> hm = preScreen.getAnswer();
            hm.remove(user.getUserId().toString());
            preScreen.setAnswer(hm);
        }
        vacancy.setJobPreScreen(jobPreScreen);

        //Tạo notification

        Notification noti = new Notification();
        noti.setNotiTime(LocalDateTime.now());
        noti.setContentNoti(vacancy.getUserInfo().getFullName() + " has been accepted you to vacancy " + vacancy.getVacancyName());

        List<Notification> listNoti = user.getNotifications();
        if(listNoti == null || listNoti.isEmpty()) listNoti = new ArrayList<>();
        listNoti.add(noti);
        user.setNotifications(listNoti);

//        //Cap nhat
        vacancyRepository.save(vacancy);
        userRepository.save(user);
    }
    public void removeApplicantVacancy(String vacancyId, String id) throws Exception{
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(vacancyId));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get vacancy in database!");
        }
        Vacancy vacancy = vacancyOptional.get();
        Optional<User> userOptional = userRepository.findById(new ObjectId(id));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();

        //Xoa bot 1 register
        List<String> registerVacancy = vacancy.getRegistants();
        registerVacancy.remove(user.getUserId().toString());
        vacancy.setRegistants(registerVacancy);


        // Xoa di mot applicant vacancy -> user
        List<String> listApplicantVacancy = user.getAppliedVacancies();
        listApplicantVacancy.remove(vacancy.getVacancyId().toString());
        user.setAppliedVacancies(listApplicantVacancy);

        //Xoa cau tra loi cua user
        JobPreScreen[] jobPreScreen = vacancy.getJobPreScreen();
        if(jobPreScreen != null){
            for (JobPreScreen preScreen : jobPreScreen) {
                HashMap<Object, Object> hm = preScreen.getAnswer();
                hm.remove(user.getUserId().toString());
                preScreen.setAnswer(hm);
            }
            vacancy.setJobPreScreen(jobPreScreen);
        }

        //Tạo notification

        Notification noti = new Notification();
        noti.setNotiTime(LocalDateTime.now());
        noti.setContentNoti(vacancy.getUserInfo().getFullName() + " has refused you to join vacancy " + vacancy.getVacancyName());

        List<Notification> listNoti = user.getNotifications();
        if(listNoti == null || listNoti.isEmpty()) listNoti = new ArrayList<>();
        listNoti.add(noti);
        user.setNotifications(listNoti);

//        Cap nhat
        vacancyRepository.save(vacancy);
        userRepository.save(user);
    }
    public void blockMemberVacancy(String vacancyId, String id) throws Exception{
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(vacancyId));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get vacancy in database!");
        }
        Vacancy vacancy = vacancyOptional.get();
        Optional<User> userOptional = userRepository.findById(new ObjectId(id));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();

        // sua trang thai participant -> vacancy
        List<Participant> listParticipantsVacancy = vacancy.getParticipants();

        for (Participant participant : listParticipantsVacancy) {
            if (Objects.equals(participant.getUserId(), user.getUserId().toString())) {
                participant.setStatus("block");
                break;
            }
        }
        vacancy.setParticipants(listParticipantsVacancy);

        //Tạo notification

        Notification noti = new Notification();
        noti.setNotiTime(LocalDateTime.now());
        noti.setContentNoti(vacancy.getUserInfo().getFullName() + " has block you to continue vacancy " + vacancy.getVacancyName());

        List<Notification> listNoti = user.getNotifications();
        if(listNoti == null || listNoti.isEmpty()) listNoti = new ArrayList<>();
        listNoti.add(noti);
        user.setNotifications(listNoti);

//        Cap nhat
        vacancyRepository.save(vacancy);
        userRepository.save(user);
    }
    public void recoverMemberVacancy(String vacancyId, String id) throws Exception{
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(vacancyId));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get vacancy in database!");
        }
        Vacancy vacancy = vacancyOptional.get();
        Optional<User> userOptional = userRepository.findById(new ObjectId(id));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();

        // Them mot participant moi -> vacancy
        List<Participant> listParticipantsVacancy = vacancy.getParticipants();

        for (Participant participant : listParticipantsVacancy) {
            if (Objects.equals(participant.getUserId(), user.getUserId().toString())) {
                participant.setStatus("received");
                break;
            }
        }
        vacancy.setParticipants(listParticipantsVacancy);

        //Noti
        Notification noti = new Notification();
        noti.setNotiTime(LocalDateTime.now());
        noti.setContentNoti(vacancy.getUserInfo().getFullName() + " has allowed you to continue vacancy " + vacancy.getVacancyName());

        List<Notification> listNoti = user.getNotifications();
        if(listNoti == null || listNoti.isEmpty()) listNoti = new ArrayList<>();
        listNoti.add(noti);
        user.setNotifications(listNoti);

        //Cap nhat
        vacancyRepository.save(vacancy);
        userRepository.save(user);
    }
    public void deleteBlockMemberVacancy(String vacancyId, String id) throws Exception{
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(vacancyId));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get vacancy in database!");
        }
        Vacancy vacancy = vacancyOptional.get();
        Optional<User> userOptional = userRepository.findById(new ObjectId(id));
        if(userOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get user in database");
        }
        User user = userOptional.get();
        // xóa participant hien tai -> vacancy
        List<Participant> listParticipantsVacancy = vacancy.getParticipants();
        for (Participant participant : listParticipantsVacancy) {
            if (Objects.equals(participant.getUserId(), user.getUserId().toString())) {
                listParticipantsVacancy.remove(participant);
                break;
            }
        }
        vacancy.setParticipants(listParticipantsVacancy);

        // Them moi mot recreived vacancy -> user
        List<String> listReceivedVacancy = user.getReceivedVacancies();
        listReceivedVacancy.remove(vacancy.getVacancyId().toString());
        user.setReceivedVacancies(listReceivedVacancy);

        //Noti
        Notification noti = new Notification();
        noti.setNotiTime(LocalDateTime.now());
        noti.setContentNoti(vacancy.getUserInfo().getFullName() + " has chased you from vacancy " + vacancy.getVacancyName());

        List<Notification> listNoti = user.getNotifications();
        if(listNoti == null || listNoti.isEmpty()) listNoti = new ArrayList<>();
        listNoti.add(noti);
        user.setNotifications(listNoti);

        vacancyRepository.save(vacancy);
        userRepository.save(user);
    }
    public Boolean updateFavoriteVacancy(String id, String vacancyId){
        Optional<User> foundUser = userRepository.findById(new ObjectId(id));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(vacancyId));
        if(vacancyOptional.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        Vacancy vacancy = vacancyOptional.get();
        Boolean isPush = true;
        // update favourite vacancy in user
        List<String> fvrVacancis = user.getFavoriteVacancies();
        if(fvrVacancis==null){
            fvrVacancis = new ArrayList<>();
        }
        if(fvrVacancis.contains(vacancyId)){
            fvrVacancis.remove(vacancyId);
            isPush = false;
        }
        else {
            fvrVacancis.add(vacancyId);
        }

        // update favourite users in vacancy
        List<String> fvrUsers = vacancy.getFavouriteUsers();
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
        user.setFavoriteVacancies(fvrVacancis);
        vacancy.setFavouriteUsers(fvrUsers);

        vacancyRepository.save(vacancy);
        userRepository.save(user);
        return  isPush;
    }
    public List<Vacancy> getAllFavouriteVacancies(String userId){
        Optional<User> foundUser = userRepository.findById(new ObjectId(userId));
        if(foundUser.isEmpty()){
            throw new DataIntegrityViolationException(MessageKeys.USER_NOT_FOUND);
        }
        User user = foundUser.get();
        List<String> fvrVacancies = user.getFavoriteVacancies();
        if(fvrVacancies==null){
            fvrVacancies = new ArrayList<>();
        }
        List<Vacancy> vacancies = new ArrayList<>();
        for (String vacancyId: fvrVacancies) {
            Optional<Vacancy> optionalVacancy = vacancyRepository.findById(new ObjectId(vacancyId));
            if(optionalVacancy.isEmpty()) continue;
            vacancies.add(optionalVacancy.get());
        }
        return vacancies;
    }
}
