package dev.projectFinder.server.services;

import dev.projectFinder.server.dtos.SkillDTO;
import dev.projectFinder.server.models.Skill;
import dev.projectFinder.server.repositories.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkillServices {
    private final SkillRepository skillRepository;
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
}
