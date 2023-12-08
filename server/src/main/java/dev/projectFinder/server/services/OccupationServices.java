package dev.projectFinder.server.services;

import dev.projectFinder.server.dtos.OccupationDTO;
import dev.projectFinder.server.models.Occupation;
import dev.projectFinder.server.repositories.OccupationRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class OccupationServices {
    private final OccupationRepository occupationRepository;
    public List<Occupation> getAllOccupations(){
        return occupationRepository.findAll();
    }
    public Occupation getOccupationById(String id){
        return occupationRepository.findById(new ObjectId(id)).orElseThrow(() -> new RuntimeException("Skill not found"));
    }
    public List<Occupation> searchOccupations(String keyWord){
        List<Occupation> occupations = occupationRepository.findAll();

        String key = keyWord.toLowerCase();
        List<Occupation> occupationSearched = new ArrayList<>();
        for (Occupation occupation : occupations) {
            if(occupation.getOccupationName().toLowerCase().contains(key)){
                occupationSearched.add(occupation);
            }
//            else{
//                String[] majors = occupation.getListMajor();
//                String[] newMajors = Arrays.stream(majors).filter(item -> item.toLowerCase().contains(key)).toArray(String[]::new);
//                if(newMajors.length != 0) {
//                    Occupation occu = new Occupation();
//                    occu.setOccupationName(occupation.getOccupationName());
//                    occu.setListMajor(newMajors);
//                    occupationSearched.add(occu);
//                }
//            }
        }
        return occupationSearched;
    }
    @Transactional
    public Occupation createNewOccupation(OccupationDTO occupationDTO){
        if(occupationRepository.existsByOccupationName(occupationDTO.getOccupationName())){
            throw new DataIntegrityViolationException("Occupation Name already exists");
        }
        Occupation occupation = Occupation.builder()
                .occupationName(occupationDTO.getOccupationName())
                .listMajor(occupationDTO.getListMajor())
                .build();
        return occupationRepository.save(occupation);
    }
    @Transactional
    public Occupation updateOccupationById(String id, OccupationDTO occupationDTO){
        Occupation existOccupation = getOccupationById(id);
        Optional<Occupation> updOccupation = occupationRepository.findOccupationByOccupationName(occupationDTO.getOccupationName());
        if (!updOccupation.isEmpty() && !occupationDTO.getOccupationName().equals(existOccupation.getOccupationName())){
            throw new DataIntegrityViolationException("Occupation name already exists");
        }
        existOccupation.setOccupationName(occupationDTO.getOccupationName());
        existOccupation.setListMajor(occupationDTO.getListMajor());
        return occupationRepository.save(existOccupation);
    }
    @Transactional
    public void deleteOccupation(String id){
        occupationRepository.deleteById(new ObjectId(id));
    }
}
