package dev.projectFinder.server.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.components.CVLink;
import dev.projectFinder.server.components.Vacancy.Combobox.Combobox;
import dev.projectFinder.server.components.Vacancy.Experience;
import dev.projectFinder.server.components.Vacancy.JobPreScreen;
import dev.projectFinder.server.components.Vacancy.UserInfo;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.HashMap;

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

    //Registants
    private User[] registants;

    //skill required
    private String[] skillsRequired;

    //experience required
    private Experience[] experiencesRequired;

    //Job prescreen
    private JobPreScreen[] jobPreScreen;

    //can post
    private Boolean post;

    public Vacancy(UnCompletedVacancy unCompletedVacancy){
        //userInfo
        userInfo = unCompletedVacancy.getUserInfo();
        //job basic

        HashMap<String, Object> jobBasic = unCompletedVacancy.getJobBasic().spreadString();
        vacancyName = (String)jobBasic.get("vacancyName");
        maxRequired = Integer.parseInt((String)jobBasic.get("maxRequired"));
        //--location
        locationType = (String)jobBasic.get("locationType");
        location = (String)jobBasic.get("location");
        locationSpecificRequired = (Boolean)jobBasic.get("locationSpecificRequired");

        //job detail -- time
        HashMap<String, Object> jobDetail = unCompletedVacancy.getJobDetail().spreadString();

        timeRequires = Arrays.stream(unCompletedVacancy.getJobDetail().getJobTypes())
                .map(Combobox::getName)
                .toArray(String[]::new);
        timeLength = Integer.parseInt((String)jobDetail.get("timeLength"));
        timePeriod = (String)jobDetail.get("timePeriod");
        timeType = (String)jobDetail.get("timeType");
        timeFirst = Integer.parseInt((String)jobDetail.get("timeFirst"));
        timeSecond = Integer.parseInt((String)jobDetail.get("timeSecond"));

        //job benefit --salary
        HashMap<String, Object> jobBenefit = unCompletedVacancy.getJobBenefit().spreadString();
        salaryType = (String)jobBenefit.get("salaryType");
        salaryFirst = Double.parseDouble((String)jobBenefit.get("salaryFirst"));
        salarySecond = Double.parseDouble((String)jobBenefit.get("salarySecond"));
        salaryRate = (String)jobBenefit.get("salaryRate");

        //job Des
        description = unCompletedVacancy.getJobDes().getDescription();
        skillsRequired = unCompletedVacancy.getJobDes().getSkills();

        //Job ref - config
        HashMap<String, Object> jobRef = unCompletedVacancy.getJobRef().spreadString();

        emailReceivers =  unCompletedVacancy.getJobRef().getEmails();;;
        canReceiveApplied = (Boolean) jobRef.get("canReceiveApplied");
        canContactViaEmail = (Boolean) jobRef.get("canContactViaEmail");
        requireResume = (Boolean) jobRef.get("requireResume");
        hiringTimeline = (String) jobRef.get("hiringTimeline");

        //registants;


        //experience required
        //private Experience[] experiencesRequired;

        //Job prescreen

        jobPreScreen = unCompletedVacancy.getJobPreScreen();

        //post
        post = false;
    }
}
