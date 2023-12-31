package dev.projectFinder.server.controllers;

import dev.projectFinder.server.components.CVLink;
import dev.projectFinder.server.components.Payment.PaymentProjectDetail;
import dev.projectFinder.server.components.Recommend;
import dev.projectFinder.server.components.Vacancy.JobPreScreen;
import dev.projectFinder.server.components.Vacancy.UserInfo;
import dev.projectFinder.server.dtos.*;
import dev.projectFinder.server.models.*;
import dev.projectFinder.server.repositories.HistoryRepository;
import dev.projectFinder.server.repositories.UnCompletedVacancyRepository;
import dev.projectFinder.server.repositories.UserRepository;
import dev.projectFinder.server.repositories.VacancyRepository;
import dev.projectFinder.server.responses.UserProfileResponse;
import dev.projectFinder.server.responses.UserResponse;
import dev.projectFinder.server.responses.UserResumeResponse;
import dev.projectFinder.server.services.EmailService;
import dev.projectFinder.server.services.ProjectService;
import dev.projectFinder.server.services.UserServices;
import dev.projectFinder.server.services.VacancyServices;
import dev.projectFinder.server.utils.MessageKeys;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
// localhost:8088/api/v1/users
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserServices userServices;
    private final UserRepository userRepository;
    private final VacancyRepository vacancyRepository;
    private final UnCompletedVacancyRepository unCompletedVacancyRepository;
    private final VacancyServices vacancyServices;
    private final ProjectService projectService;

    //  localhost:8088/api/v1/users/register/page=5&record=10
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO,
                                        BindingResult result) {

        HashMap<String, Object> Response = new HashMap<>();
        if (result.hasErrors()) {
            List<String> errMsgs = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            Response.put("message", errMsgs.toString());
            return ResponseEntity.badRequest().body(Response);
        }
        try {
            UserResponse newUser = userServices.createUser(userDTO);
            Response.put("message", MessageKeys.REGISTER_SUCCESSFULLY);
            Response.put("user", newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(Response);
        } catch (Exception e) {
            Response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO userLoginDTO, BindingResult result) {
        // check login information and create token
        // return token response
        // this token is used to log in again if login
        HashMap<String, Object> loginResponse = new HashMap<>();

        if (result.hasErrors()) {
            List<String> errMsgs = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            loginResponse.put("message", errMsgs.toString());
            return ResponseEntity.badRequest().body(loginResponse);
        }
        try {
            UserResponse user = userServices.login(userLoginDTO);
            loginResponse.put("message", MessageKeys.LOGIN_SUCCESSFULLY);
            loginResponse.put("isActive", user.getIsActive());
            loginResponse.put("user", user);
            return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
        } catch (Exception e) {
            loginResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(loginResponse);
        }
    }

    @PutMapping("/update-user-information/{id}")
    public ResponseEntity<?> updateUserInformation(@PathVariable String id, @RequestBody UserInforDTO userInforDTO) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            if(userInforDTO.getActions()==0){
                response.put("message", "Action is not null");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            if (userInforDTO.getActions() == 1) {
                userServices.updateSocialLink(id, userInforDTO);
                response.put("message", MessageKeys.UPDATE_SOCIAL_LINK_SUCCESSFULLY);
            }
            if (userInforDTO.getActions() == 2) {
                userServices.updateAddress(id, userInforDTO);
                response.put("message", MessageKeys.UPDATE_ADDRESS_SUCCESSFULLY);
            }
            if (userInforDTO.getActions() == 3) {
                userServices.updateUserInformation(id, userInforDTO);
                response.put("message", MessageKeys.UPDATE_INFORMATION_SUCCESSFULLY);
            }
            if (userInforDTO.getActions() == 4) {
                userServices.updateCompanyFields(id, userInforDTO);
                response.put("message", "Update company field successfully!");

            }
            User user = userServices.getUserDetail(id);
            UserProfileResponse userProfileResponse = UserProfileResponse.builder()
                    .avatar(user.getAvatar())
                    .fullName(user.getFullName())
                    .phoneNumber(user.getPhoneNumber())
                    .email(user.getEmail())
                    .dayOfBirth(user.getDayOfBirth())
                    .website(user.getWebsite())
                    .description(user.getDescription())
                    .fbLink(user.getFbLink())
                    .twLink(user.getTwLink())
                    .insLink(user.getInsLink())
                    .lkLink(user.getLkLink())
                    .address(user.getAddress())
                    .build();
            if (user.getUserType().equals("seeker")) {
                userProfileResponse.setExpectSalary(user.getExpectSalary());
            } else {
                userProfileResponse.setTeamSize(user.getTeamSize());
                userProfileResponse.setFields(user.getFields());
            }

            response.put("userProfile", userProfileResponse);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }


    }

    @PutMapping("/update-seeker-resume/{id}")
    public ResponseEntity<?> updateSeekerInformation(@PathVariable String id, @RequestBody SeekerResumeDTO seekerResumeDTO) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            userServices.updateSeekerInformation(id, seekerResumeDTO);
            response.put("message", MessageKeys.UPDATE_INFORMATION_SUCCESSFULLY);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/update-seeker-cv/{id}")
    public ResponseEntity<?> updateCVLinks(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            CVLink cv = userServices.updateSeekerCV(id, file);
            response.put("message", "Update Cv successfully");
            response.put("cv", cv);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/update-filename-cv/{id}")
    public ResponseEntity<?> updateFilenameCV(@PathVariable String id, @RequestParam("newName") String filename, @RequestParam("publicId") String publicId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            userServices.updateFilenameCV(id, filename, publicId);
            response.put("message", "Update Cv successfully!");
            response.put("newName", filename);
            response.put("publicId", publicId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/update-image-user/{id}")
    public ResponseEntity<?> updateImages(@PathVariable String id, @RequestParam("file") MultipartFile file, @RequestParam("publicId") String publicId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            User user = userServices.updateImages(id, file, publicId);
            response.put("message", "Update image successfully");
            response.put("image", user.getAvatar());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/delete-seeker-cv/{id}")
    public ResponseEntity<?> deleteCVLink(@PathVariable String id, @RequestParam("publicId") String publicId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            userServices.deleteSeekerCV(id, publicId);
            response.put("message", "Delete Cv successfully");
            response.put("deleteId", publicId);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-all-cv/{id}")
    public ResponseEntity<?> getAllCVs(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            User user = userServices.getUserDetail(id);
            response.put("message", "Get all Cv successfully");
            response.put("cvLinks", user.getCvLinks());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-profile-user/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            User user = userServices.getUserDetail(id);
            UserProfileResponse userProfileResponse = UserProfileResponse.builder()
                    .avatar(user.getAvatar())
                    .fullName(user.getFullName())
                    .phoneNumber(user.getPhoneNumber())
                    .email(user.getEmail())
                    .dayOfBirth(user.getDayOfBirth())
                    .website(user.getWebsite())
                    .description(user.getDescription())
                    .fbLink(user.getFbLink())
                    .twLink(user.getTwLink())
                    .insLink(user.getInsLink())
                    .lkLink(user.getLkLink())
                    .address(user.getAddress())
                    .build();
            if (user.getUserType().equals("seeker")) {
                userProfileResponse.setExpectSalary(user.getExpectSalary());
            } else {
                userProfileResponse.setTeamSize(user.getTeamSize());
                userProfileResponse.setFields(user.getFields());
            }
            response.put("message", "Get user profile successfully");
            response.put("userProfile", userProfileResponse);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-resume-user/{id}")
    public ResponseEntity<?> getUserResume(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            User user = userServices.getUserDetail(id);
            UserResumeResponse userResumeResponse = UserResumeResponse.builder()
                    .cvLinks(user.getCvLinks())
                    .jobDes(user.getJobDes())
                    .certificationUsers(user.getCertificationUsers())
                    .skillUsers(user.getSkillUsers())
                    .educationUsers(user.getEducationUsers())
                    .experienceUsers(user.getExperienceUsers())
                    .jobTitle(user.getJobTitle())
                    .build();
            response.put("message", "Get user profile successfully");
            response.put("userResume", userResumeResponse);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-vacancy-cor/{id}")
    public ResponseEntity<?> getVacancyCor(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            User user = userServices.getUserDetail(id);
            List<UnCompletedVacancy> incomplete = new ArrayList<>();
            if (user.getUnCompletedVacancies() != null) {
                for (String unCompleteId : user.getUnCompletedVacancies()) {
                    Optional<UnCompletedVacancy> fu = unCompletedVacancyRepository.findById(new ObjectId(unCompleteId));
                    fu.ifPresent(incomplete::add);
                }
            }
            List<Vacancy> complete = new ArrayList<>();
            if (user.getVacancies() != null) {
                for (String completeId : user.getVacancies()) {
                    Optional<Vacancy> cv = vacancyRepository.findById(new ObjectId(completeId));
                    cv.ifPresent(complete::add);
                }
            }
            response.put("message", "Get all vacancy company successfully!");
            response.put("incomplete", incomplete);
            response.put("complete", complete);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-complete-vacancy-cor/{id}")
    public ResponseEntity<?> getCompleteVacancyCor(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user = userServices.getUserDetail(id);
            List<Vacancy> complete = new ArrayList<>();

            if(user.getVacancies()!=null){
                for (String completeId:user.getVacancies()) {
                    Optional<Vacancy> cv = vacancyRepository.findById(new ObjectId(completeId));
                    if(!cv.isEmpty()){
                        Vacancy vc = cv.get();
                        if(vc.getPost() && vc.getDatePost() != null){
                            float hours = ChronoUnit.HOURS.between(vc.getDatePost(), LocalDateTime.now());
                            System.out.println("HOURS: " + hours/ 24 + "   LENGTH: " + vc.getLength());
                            if(hours / 24 > vc.getLength()){
                                vc.setPost(false);
                                vc.setLength(0);
                                vc.setApprovalStatus("pending");
                                vc.setDatePost(null);
                            }
                        }
                        complete.add(vc);
                    }

                }
                vacancyRepository.saveAll(complete);
            }
            response.put("message","Get all vacancy company successfully!");
            response.put("complete",complete);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-incomplete-vacancy-cor/{id}")
    public ResponseEntity<?> getUnCompleteVacancyCor(@PathVariable String id){
        HashMap<String, Object> response = new HashMap<>();
        try{
            User user = userServices.getUserDetail(id);
            List<UnCompletedVacancy> incomplete = new ArrayList<>();
            if(user.getUnCompletedVacancies()!=null){
                for (String unCompleteId:user.getUnCompletedVacancies()) {
                    Optional<UnCompletedVacancy> fu = unCompletedVacancyRepository.findById(new ObjectId(unCompleteId));
                    fu.ifPresent(incomplete::add);
                }
            }

            response.put("message","Get all vacancy company successfully!" );
            response.put("incomplete",incomplete);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-all-users")
    public ResponseEntity<?> getAllUser() {
        HashMap<String, Object> response = new HashMap<>();
        try {
            List<User> users = userServices.getAllUser();
            response.put("message", "Get all users successfully");
            response.put("users", users);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-all-seekers")
    public ResponseEntity<?> getAllSeekers() {
        HashMap<String, Object> response = new HashMap<>();
        try {
            List<User> users = userServices.getAllUser();
            List<User> seekers = users.stream().filter(user -> user.getUserType().equals("seeker")).toList();
            response.put("message", "Get all seekers successfully");
            response.put("users", seekers);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-user-by-id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            // get cor detail
            User user = userServices.getUserDetail(id);
            userServices.increaseViews(id);

            response.put("message", "Get detail user successfully");
            response.put("userDetail", user);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-short-listed-users/{id}")
    public ResponseEntity<?> getShortListedUsers(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            User user = userServices.getUserDetail(id);
            List<String> userIds = user.getShortListedUser();
            List<User> users = new ArrayList<>();
            if (userIds == null) userIds = new ArrayList<>();
            for (String uid : userIds) {
                Optional<User> ou = userRepository.findById(new ObjectId(uid));
                ou.ifPresent(users::add);
            }
            response.put("message", "Get short listed users successfully");
            response.put("shortListed", users);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/send-token-verify-by-email/{id}")
    public ResponseEntity<?> sendTokenVerifyByEmail(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            String token = userServices.generateTokenVerifyAccount(id);
            response.put("message", "Send email verify user successfully");
            response.put("token", token);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/send-token-reset-by-email")
    public ResponseEntity<?> sendTokenResetByEmail(@RequestParam("username") String username) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            System.out.println("cc");
            String token = userServices.generateTokenResetPassword(username);
            response.put("message", "Send email reset password user successfully");
            response.put("token", token);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PutMapping("/update-token-verify")
    public ResponseEntity<?> updateVerifyAccount(@RequestParam("token") String token) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            User user = userServices.updateVerifyAccount(token);
            response.put("message", "Verify account user successfully");
            response.put("userVerify", user);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PutMapping("/update-token-reset")
    public ResponseEntity<?> updateResetPassword(@RequestParam("token") String token, @RequestParam("newPassword") String password) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            User user = userServices.updateResetPassword(token, password);
            response.put("message", "Reset password user successfully");
            response.put("userVerify", user);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PutMapping("/update-password/{id}")
    public ResponseEntity<?> updatePassword(@RequestParam("oldPassword") String oldPass, @RequestParam("newPassword") String newPass, @PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            userServices.updatePassword(id, oldPass, newPass);
            response.put("message", "Change password user successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PutMapping("/update-shortListedUser/{id}")
    public ResponseEntity<?> updateShortListedUser(@RequestParam("userId") String userId, @PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            userServices.updateShortListedUser(id, userId);
            response.put("message", "Update short listed user successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-data-statistical/{id}")
    public ResponseEntity<?> getDataStatistical(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            User user = userServices.getUserDetail(id);

            List<Vacancy> complete = new ArrayList<>();
            if (user.getAppliedVacancies() != null) {
                for (String vacancyId : user.getAppliedVacancies()) {
                    Optional<Vacancy> cv = vacancyRepository.findById(new ObjectId(vacancyId));
                    cv.ifPresent(complete::add);
                }
            }
            List<String> vacanciesId = user.getVacancies();
            List<HashMap<String, Object>> recentApplicants = new ArrayList<>();
            if (vacanciesId != null) {
                for (String vid : vacanciesId) {
                    HashMap<String, Object> app = vacancyServices.getAllApplicantsVacancyWithVacancyTitle(vid);
                    if (app != null)
                        recentApplicants.add(app);
                }
            }

            response.put("recentApplicants", recentApplicants);
            response.put("fvrVacancies", user.getFavoriteVacancies() != null ? user.getFavoriteVacancies().size() : 0);
            response.put("fvrProjects", user.getFavoriteProjects() != null ? user.getFavoriteProjects().size() : 0);
            response.put("notification", user.getNotifications() != null ? user.getNotifications().subList(0, Math.min(user.getNotifications().size(), 10)) : new ArrayList<>());
            response.put("shortListed", user.getShortListedUser() != null ? user.getShortListedUser().size() : 0);
            response.put("postedVacancies", user.getVacancies() != null ? user.getVacancies().size() : 0);
            response.put("postedProjects", user.getProjects() != null ? user.getProjects().size() : 0);
            response.put("message", "Get data statistical successfully");
            response.put("appliedVacancies", complete);
            response.put("viewProfiles", user.getViewsProfiles());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-data-statistical-admin")
    public ResponseEntity<?> getDataStatisticalAdmin() {
        HashMap<String, Object> response = new HashMap<>();
        try {
            response = userServices.getDataStatisticalAdmin("6556ca3b5e265815afd0ffca");
            response.put("message", "Get data statistical admin successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/get-all-organizers")
    public ResponseEntity<?> getAllOrganizer() {
        HashMap<String, Object> response = new HashMap<>();
        try {
            List<User> users = userServices.getAllUser();
            List<User> cors = users.stream().filter(user -> user.getUserType().equals("organizer")).toList();
            response.put("message", "Get all organizers successfully");
            response.put("users", cors);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-projects-vacancies-to-invite/{id}")
    public ResponseEntity<?> getProjectsVacanciesToInvite(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            List<Vacancy> vacancyList = vacancyServices.getAllVacanciesUserRecommend(id);
            List<Project> projects = projectService.getAllProjectUserRecommend(id);

            List<Recommend> recommends = new ArrayList<>();
            if(vacancyList!=null){
                for(Vacancy v : vacancyList){
                    recommends.add(new Recommend(v.getVacancyId().toString(), v.getVacancyName(), v.getTimeLength()+" "+v.getTimePeriod(), v.getSkillsRequired(), "vacancy"));
                }
            }
            if(projects!=null){
                for(Project v : projects){
                    recommends.add(new Recommend(v.getProjectId().toString(), v.getProjectName(), v.getDuration()+" "+v.getPeriod(), v.getOccupations(),"project"));
                }
            }
            response.put("message", "Get all recommend successfully");
            response.put("recommends",recommends);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @GetMapping("/get-all-histories")
    public ResponseEntity<?> getAllHistories() {
        HashMap<String, Object> response = new HashMap<>();
        try {
            List<History> histories = userServices.getAllHistoryTransaction();
            List<HistoryDTO> historyDTOS = new ArrayList<>();
            for(History h : histories){
                if(h.getProject()!=null){
                    Project p = h.getProject();
                    List<VacancyHistoryDTO> vacancyHistoryDTOList = new ArrayList<>();
                    List<PaymentProjectDetail> paymentProjectDetails = p.getDetail();
                    if(paymentProjectDetails==null) paymentProjectDetails = new ArrayList<>();
                    for(PaymentProjectDetail ppd : paymentProjectDetails) {
                        Optional<Vacancy> ov = vacancyRepository.findById(new ObjectId(ppd.getVacancyId()));
                        if(ov.isPresent()){
                            Vacancy v = ov.get();
                            VacancyHistoryDTO vhDTO = VacancyHistoryDTO.builder()
                                    .vacancyId(v.getVacancyId())
                                    .vacancyName(v.getVacancyName())
                                    .maxRequired(v.getMaxRequired())
                                    .location(v.getLocation())
                                    .locationType(v.getLocationType())
                                    .createdAt(v.getCreatedAt())
                                    .hiringTimeline(v.getHiringTimeline())
                                    .paymentAmount((float) (ppd.getMaxRequired()*ppd.getBaseMoney()))
                                .build();
                            vacancyHistoryDTOList.add(vhDTO);
                        }
                    }
                    ProjectHistoryDTO phDTo = ProjectHistoryDTO.builder()
                            .projectId(p.getProjectId())
                            .projectName(p.getProjectName())
                            .startDate(p.getStartDate())
                            .duration(p.getDuration())
                            .period(p.getPeriod())
                            .maxParticipants(p.getMaxParticipants())
                            .budget(p.getBudget())
                            .createdAt(p.getCreatedAt())
                            .vacancies(vacancyHistoryDTOList)
                            .build();
                    Optional<User> uopt = userRepository.findById(p.getUserId());


                    HistoryDTO historyDTO =  HistoryDTO.builder()
                            .historyId(h.getHistoryId())
                            .cart(h.getCart())
                            .create_time(h.getCreate_time())
                            .id(h.getId())
                            .intent(h.getIntent())
                            .payer(h.getPayer())
                            .state(h.getState())
                            .transactions(h.getTransactions())
                            .update_time(h.getUpdate_time())
                            .response(h.getResponse())
                            .vacancy(h.getVacancy())
                            .project(phDTo)
                            .userInfo(new UserInfo(p.getUserId().toString(), uopt.get().getAvatar().getFileUrl(), uopt.get().getFullName()))
                            .build();
                    historyDTOS.add(historyDTO);
                }
                else {
                    HistoryDTO historyDTO =  HistoryDTO.builder()
                            .historyId(h.getHistoryId())
                            .cart(h.getCart())
                            .create_time(h.getCreate_time())
                            .id(h.getId())
                            .intent(h.getIntent())
                            .payer(h.getPayer())
                            .state(h.getState())
                            .transactions(h.getTransactions())
                            .update_time(h.getUpdate_time())
                            .response(h.getResponse())
                            .vacancy(h.getVacancy())
                            .project(null)
                            .userInfo(h.getVacancy().getUserInfo())
                            .build();
                    historyDTOS.add(historyDTO);
                }
            }
            response.put("message", "Get all histories successfully");
            response.put("histories", historyDTOS);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PutMapping("/update-active-cor/{id}")
    public ResponseEntity<?> updateActiveCor(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            userServices.updateActiveCor(id);
            response.put("message", "Update active of organizer successfully!");
            response.put("userUpd", id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/apply-vacancies/{id}/{vacancyId}")
    public ResponseEntity<?> applyVacancy(@PathVariable String id, @PathVariable String vacancyId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            String message = userServices.applyVacancy(id, vacancyId);
            response.put("message", message);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @PostMapping("/send-mail-recommend/{id}")
    public ResponseEntity<?> sendMailRecommend(@PathVariable String id, @RequestParam("recommendId") String recommendId, @RequestParam("recommendType") String recommendType, @RequestParam("seekerId") String seekerId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            userServices.sendRecommendEmail(id, recommendId, seekerId, recommendType);
            response.put("message", "Your recommend email has been send to this seeker!");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/apply-vacancy-and-answers/{id}/{vacancyId}")
    public ResponseEntity<?> applyVacancyWithAnswer(@PathVariable String id, @PathVariable String vacancyId, @RequestBody JobPreScreen[] jobPreScreen) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            String message = userServices.applyVacancyAndAnswers(id, vacancyId, jobPreScreen);
            response.put("message", message);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
