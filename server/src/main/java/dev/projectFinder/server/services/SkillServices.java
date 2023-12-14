package dev.projectFinder.server.services;

import dev.projectFinder.server.components.VacPro;
import dev.projectFinder.server.dtos.ReportDTO;
import dev.projectFinder.server.dtos.SkillDTO;
import dev.projectFinder.server.models.*;
import dev.projectFinder.server.repositories.*;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkillServices {
    private final SkillRepository skillRepository;
    private final VacancyRepository vacancyRepository;
    private final ProjectRepository projectRepository;
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    public List<Skill> getAllSkills(){
        return skillRepository.findAll();
    }
    public Skill getSkillById(String id){
        return skillRepository.findById(new ObjectId(id)).orElseThrow(() -> new RuntimeException("Skill not found"));
    }
    @Transactional
    public Skill createNewSkill(SkillDTO skillDTO){
        if(skillRepository.existsBySkillName(skillDTO.getSkillName())){
            throw  new DataIntegrityViolationException("Skill Name already exists");
        }
        Skill skill = Skill.builder()
                .skillName(skillDTO.getSkillName())
                .description(skillDTO.getDescription())
                .build();
        return skillRepository.save(skill);
    }
    @Transactional
    public Skill updateSkillById(String id, SkillDTO skillDTO){
        Skill existsSkill = getSkillById(id);
        Optional<Skill> uptSkill = skillRepository.findSkillBySkillName(skillDTO.getSkillName());
        if (uptSkill.isPresent() && !skillDTO.getSkillName().equals(existsSkill.getSkillName())){
           throw new DataIntegrityViolationException("Skill name already exists");
        }
        existsSkill.setSkillName(skillDTO.getSkillName());
        existsSkill.setDescription(skillDTO.getDescription());
        return skillRepository.save(existsSkill);
    }
    @Transactional
    public void deleteSkill(String id){
         skillRepository.deleteById(new ObjectId(id));
    }
    public void reportVacancyProject(String itemid, ReportDTO reportDTO){
        Optional<Vacancy> optionalVacancy = vacancyRepository.findById(new ObjectId(itemid));
        Optional<Project> optionalProject = projectRepository.findById(new ObjectId(itemid));
        if(optionalVacancy.isEmpty()&&optionalProject.isEmpty())  throw new DataIntegrityViolationException("Vacancy or Project is not found!");
        Report report = Report.builder()
                .fromId(reportDTO.getFromId())
                .toId(reportDTO.getToId())
                .vacOrProjId(reportDTO.getVacOrProjId())
                .reportType(reportDTO.getReportType())
                .additionalInformation(reportDTO.getAdditionalInformation())
                .isVacancy(reportDTO.getIsVacancy())
                .avatar(reportDTO.getAvatar())
                .orgName(reportDTO.getOrgName())
                .build();
        Report newReport =  reportRepository.save(report);
        if(reportDTO.getIsVacancy()){
           Vacancy vacancy= optionalVacancy.get();
           List<String> reportIds = vacancy.getReports();
           if(reportIds==null) reportIds = new ArrayList<>();
           reportIds.add(newReport.getReportId().toString());
           vacancy.setReports(reportIds);
           vacancyRepository.save(vacancy);
        }else {
            Project project= optionalProject.get();
            List<String> reportIds = project.getReports();
            if(reportIds==null) reportIds = new ArrayList<>();
            reportIds.add(newReport.getReportId().toString());
            project.setReports(reportIds);
            projectRepository.save(project);
        }
    }
    public List<Report> getAllReportOfVacancyProject(String id, Boolean isVacancy){
        List<Report> reports = new ArrayList<>();
        if(isVacancy){
            Optional<Vacancy> optionalVacancy = vacancyRepository.findById(new ObjectId(id));
            if(optionalVacancy.isEmpty())  throw new DataIntegrityViolationException("Vacancy is not found!");
            Vacancy vacancy = optionalVacancy.get();
            List<String> reportIds = vacancy.getReports();
            for ( String reportId: reportIds){
                reports.add(reportRepository.findById(new ObjectId(reportId)).get());
            }
        }
        else{
            Optional<Project> optionalProject = projectRepository.findById(new ObjectId(id));
            if(optionalProject.isEmpty())  throw new DataIntegrityViolationException("Project is not found!");
            Project project = optionalProject.get();
            List<String> reportIds = project.getReports();
            for ( String reportId: reportIds){
                reports.add(reportRepository.findById(new ObjectId(reportId)).get());
            }
        }
       return reports;
    }
    public List<VacPro> getAllVacProHasReport(){
        List<Vacancy> vacancies = vacancyRepository.findByReportsNotNull();
        List<Project> projects = projectRepository.findByReportsNotNull();
        List<VacPro> vacPros = new ArrayList<>();
        for (Vacancy v: vacancies) {
            vacPros.add(new VacPro(v.getVacancyId().toString(),
                    v.getUserInfo().getAvatar(), v.getUserInfo().getFullName(),
                    true, v.getLocation(), v.getVacancyName(),
                    v.getCreatedAt(), v.getHiringTimeline(), v.getSkillsRequired(),
                    v.getDescription(),
                    v.getReports()));
        }
        for (Project p: projects) {
            User u = userRepository.findById(p.getUserId()).get();
            String avt = u.getAvatar() !=null? u.getAvatar().getFileUrl() : "https://pic.onlinewebfonts.com/thumbnails/icons_148020.svg";
            vacPros.add(new VacPro(p.getProjectId().toString(),
                    avt, u.getFullName(),
                    false, u.getAddress().getProvince()!=null ?u.getAddress().getProvince():"No information" ,
                    p.getProjectName(),
                    p.getCreatedAt(), p.getDuration(), p.getOccupations(),
                    p.getDescription(), p.getReports()));
        }
        return vacPros;
    }

}
