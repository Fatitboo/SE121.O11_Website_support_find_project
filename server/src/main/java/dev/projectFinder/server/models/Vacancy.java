package dev.projectFinder.server.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.components.CVLink;
import dev.projectFinder.server.components.Participant;
import dev.projectFinder.server.components.Vacancy.Combobox.Combobox;
import dev.projectFinder.server.components.Vacancy.Experience;
import dev.projectFinder.server.components.Vacancy.JobPreScreen;
import dev.projectFinder.server.components.Vacancy.UserInfo;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "vacancies")
public class Vacancy {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId vacancyId;
    //cor Info
    private UserInfo userInfo;

    //job basic
    private String vacancyName;
    private int maxRequired;
    //--location
    private String locationType;
    private String location;
    private boolean locationSpecificRequired;

    //job detail -- time
    private String[] timeRequires;
    private int timeLength;
    private String timePeriod;
    private String timeType;
    private int timeFirst;
    private int timeSecond;

    //job benefit --salary
    private String salaryType;
    private double salaryFirst;
    private double salarySecond;
    private String salaryRate;

    //job Des
    private String description;

    //Job ref - config
    private String[] emailReceivers;
    private boolean canReceiveApplied;
    private boolean canContactViaEmail;
    private boolean requireResume;
    private String hiringTimeline;
    private int length;

    //Registants
    private List<String> registants;

    private List<Participant> participants;
    private List<Participant> rejectParticipants;

    //skill required
    private String[] skillsRequired;

    //experience required
    private Experience[] experiencesRequired;

    //Job prescreen
    private JobPreScreen[] jobPreScreen;

    //can post
    private Boolean post;
    private LocalDateTime datePost;

    private List<String> reports;

    private List<String> favouriteUsers;
    private String project;

    // admin approval
    // 1. first created: pending
    // 2. Admin browser =>  accepted => post cor set true or false
    // 3.                   rejected => post => false
    // 4 report => cancel => post => false
    private String approvalStatus;

    // date create and update
    @CreatedDate
    private LocalDateTime createdAt;

    public Vacancy(UnCompletedVacancy unCompletedVacancy){
        //userInfo
        userInfo = unCompletedVacancy.getUserInfo();
        //job basic

        HashMap<String, Object> jobBasic = unCompletedVacancy.getJobBasic().spreadString();
        if(jobBasic.get("vacancyName") != null)
            vacancyName = (String)jobBasic.get("vacancyName");
        if(!((String)jobBasic.get("maxRequired")).isEmpty())
            maxRequired = Integer.parseInt((String)jobBasic.get("maxRequired"));
        //--location
        if(jobBasic.get("locationType") != null)
            locationType = (String)jobBasic.get("locationType");
        if(jobBasic.get("location") != null)
            location = (String)jobBasic.get("location");
        if(jobBasic.get("locationSpecificRequired") != null)
            locationSpecificRequired = (Boolean)jobBasic.get("locationSpecificRequired");

        //job detail -- time
        HashMap<String, Object> jobDetail = unCompletedVacancy.getJobDetail().spreadString();

        timeRequires = Arrays.stream(unCompletedVacancy.getJobDetail().getJobTypes())
                .map(Combobox::getName)
                .toArray(String[]::new);
        if(!((String)jobDetail.get("timeLength")).isEmpty())
            timeLength = Integer.parseInt((String)jobDetail.get("timeLength"));
        if(jobDetail.get("timePeriod") != null)
            timePeriod = (String)jobDetail.get("timePeriod");
        if(jobDetail.get("timeType") != null)
            timeType = (String)jobDetail.get("timeType");
        if(!((String)jobDetail.get("timeFirst")).isEmpty())
            timeFirst = Integer.parseInt((String)jobDetail.get("timeFirst"));
        if(!((String)jobDetail.get("timeSecond")).isEmpty())
            timeSecond = Integer.parseInt((String)jobDetail.get("timeSecond"));

        //job benefit --salary
        HashMap<String, Object> jobBenefit = unCompletedVacancy.getJobBenefit().spreadString();
        if(jobBenefit.get("salaryType") != null)
            salaryType = (String)jobBenefit.get("salaryType");
        if(!((String)jobBenefit.get("salaryFirst")).isEmpty())
            salaryFirst = Double.parseDouble((String)jobBenefit.get("salaryFirst"));
        if(!((String)jobBenefit.get("salarySecond")).isEmpty())
            salarySecond = Double.parseDouble((String)jobBenefit.get("salarySecond"));
        if(jobBenefit.get("salaryRate") != null)
            salaryRate = (String)jobBenefit.get("salaryRate");

        //job Des
        description = unCompletedVacancy.getJobDes().getDescription();
        skillsRequired = unCompletedVacancy.getJobDes().getSkills();

        //Job ref - config
        HashMap<String, Object> jobRef = unCompletedVacancy.getJobRef().spreadString();

        emailReceivers =  unCompletedVacancy.getJobRef().getEmails();
        canReceiveApplied = (Boolean) jobRef.get("canReceiveApplied");
        canContactViaEmail = (Boolean) jobRef.get("canContactViaEmail");
        requireResume = (Boolean) jobRef.get("requireResume");
        hiringTimeline = (String) jobRef.get("hiringTimeline");

        //registants;


        //experience required
        //private Experience[] experiencesRequired;

        //Job prescreen
        if(unCompletedVacancy.getJobPreScreen() != null)
            jobPreScreen = unCompletedVacancy.getJobPreScreen();

        //post
        post = false;
    }

    public void setValue(Vacancy vc){

        //job basic
        if(vc.getVacancyName() != null)
            vacancyName = (String)vc.getVacancyName();
        maxRequired = vc.getMaxRequired();
        //--location
        if(vc.getLocationType() != null)
            locationType = vc.getLocationType();
        if(vc.getLocation() != null)
            location = vc.getLocation();
        locationSpecificRequired = vc.isLocationSpecificRequired();

        //job detail -- time

        timeRequires = vc.getTimeRequires();

        timeLength = vc.getTimeLength();
        timePeriod = vc.getTimePeriod();
        timeType = vc.getTimeType();
        timeFirst = vc.getTimeFirst();
        timeSecond = vc.getTimeSecond();

        //job benefit --salary
        salaryType = vc.getSalaryType();
        salaryFirst = vc.getSalaryFirst();
        salarySecond = vc.getSalarySecond();
        salaryRate = vc.getSalaryRate();

        //job Des
        description = vc.getDescription();
        skillsRequired = vc.getSkillsRequired();

        //Job ref - config

        emailReceivers =  vc.getEmailReceivers();
        canReceiveApplied = vc.isCanReceiveApplied();
        canContactViaEmail =vc.isCanContactViaEmail();
        requireResume = vc.isRequireResume();
        hiringTimeline = vc.getHiringTimeline();

        //registants;


        //experience required
        //private Experience[] experiencesRequired;

//        //Job prescreen
//        if(unCompletedVacancy.getJobPreScreen() != null)
//            jobPreScreen = unCompletedVacancy.getJobPreScreen();

    }
}
