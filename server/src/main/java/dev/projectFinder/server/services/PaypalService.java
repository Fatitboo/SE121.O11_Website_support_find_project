package dev.projectFinder.server.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import dev.projectFinder.server.components.Payment.PaymentProjectDetail;
import dev.projectFinder.server.models.History;
import dev.projectFinder.server.models.Project;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.repositories.HistoryRepository;
import dev.projectFinder.server.repositories.ProjectRepository;
import dev.projectFinder.server.repositories.UserRepository;
import dev.projectFinder.server.repositories.VacancyRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaypalService {
    @Autowired
    private APIContext apiContext;
    @Autowired
    private HistoryRepository historyRepository;
    @Autowired
    private final VacancyRepository vacancyRepository;
    @Autowired
    private final ProjectRepository projectRepository;
    @Autowired
    private final UserRepository userRepository;


    public Payment createPayment(
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelUrl,
            String successUrl) throws PayPalRESTException{
        Amount amount = new Amount();
        amount.setCurrency(currency);
        total = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP).doubleValue();
        amount.setTotal(String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method.toString());

        Payment payment = new Payment();
        payment.setIntent(intent.toString());
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException{
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecute);
    }

    public void saveHistotyPayment(String paymentJson, String vacancyId, int length) {
        try{
            Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(vacancyId));
            if(vacancyOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get job in database");
            }

            Vacancy vacancy = vacancyOptional.get();

            ObjectMapper mapper = new ObjectMapper();

            JsonNode node = mapper.readTree(paymentJson);
            History history = new History(node);

            history.response = paymentJson;
            history.setVacancy(vacancy);
            ObjectId id = historyRepository.save(history).getHistoryId();

            vacancy.setApprovalStatus("approved");
            vacancy.setPost(true);
            vacancy.setLength(length);
            vacancy.setDatePost(LocalDateTime.now());
            Optional<User> userOptional = userRepository.findById(new ObjectId(vacancy.getUserInfo().getUserId()));
            if(userOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get user in database!");
            }

            User user = userOptional.get();

            List<String> historyPayment = user.getHistoryPayment();
            if(historyPayment == null || historyPayment.isEmpty()){
                historyPayment = new ArrayList<>();
            }
            historyPayment.add(id.toString());

            user.setHistoryPayment(historyPayment);

            userRepository.save(user);
            vacancyRepository.save(vacancy);
        }
        catch(JsonProcessingException e){
            Optional<Vacancy> vacancyOptional = vacancyRepository.findById(new ObjectId(vacancyId));
            if(vacancyOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get job in database");
            }

            Vacancy vacancy = vacancyOptional.get();
            History history = new History();
            history.response = paymentJson;
            history.setVacancy(vacancy);
            ObjectId id = historyRepository.save(history).getHistoryId();
            vacancy.setApprovalStatus("approved");

            Optional<User> userOptional = userRepository.findById(new ObjectId(vacancy.getUserInfo().getUserId()));
            if(userOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get user in database!");
            }

            User user = userOptional.get();

            List<String> historyPayment = user.getHistoryPayment();
            if(historyPayment == null || historyPayment.isEmpty()){
                historyPayment = new ArrayList<>();
            }
            historyPayment.add(id.toString());

            userRepository.save(user);
            vacancyRepository.save(vacancy);
        }
    }

    public void saveHistotyProjectPayment(String paymentJson, String projectId, int length) {
        try{
            Optional<Project> projectOptional = projectRepository.findById(new ObjectId(projectId));
            if(projectOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get project in database");
            }

            Project project = projectOptional.get();

            ObjectMapper mapper = new ObjectMapper();

            JsonNode node = mapper.readTree(paymentJson);
            History history = new History(node);

            history.response = paymentJson;
            history.setProject(project);
            ObjectId id = historyRepository.save(history).getHistoryId();

            project.setStatus("approved");
            project.setLength(length);
            project.setDatePost(LocalDateTime.now());
            project.setDetail(null);

            ObjectId[] vcList = project.getVacancies();
            List<Vacancy> lVC = new ArrayList<>();

            for(int i = 0; i < vcList.length; i++){
                Optional<Vacancy> vacancyOptional = vacancyRepository.findById(vcList[i]);
                if(vacancyOptional.isEmpty()){
                    throw new DataIntegrityViolationException("Error when get job in database");
                }

                Vacancy vacancy = vacancyOptional.get();
                vacancy.setApprovalStatus("approved");
                vacancy.setPost(true);
                vacancy.setLength(length);
                vacancy.setDatePost(LocalDateTime.now());
                lVC.add(vacancy);
            }

            Optional<User> userOptional = userRepository.findById(project.getUserId());
            if(userOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get user in database!");
            }

            User user = userOptional.get();

            List<String> historyPayment = user.getHistoryProjectPayment();
            if(historyPayment == null || historyPayment.isEmpty()){
                historyPayment = new ArrayList<>();
            }
            historyPayment.add(id.toString());

            user.setHistoryProjectPayment(historyPayment);

            userRepository.save(user);
            projectRepository.save(project);
            vacancyRepository.saveAll(lVC);
        }
        catch(JsonProcessingException e){
            Optional<Project> projectOptional = projectRepository.findById(new ObjectId(projectId));
            if(projectOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get project in database");
            }

            Project project = projectOptional.get();
            History history = new History();

            history.response = paymentJson;
            history.setProject(project);
            ObjectId id = historyRepository.save(history).getHistoryId();

            project.setStatus("approved");
            project.setLength(length);
            project.setDatePost(LocalDateTime.now());

            ObjectId[] vcList = project.getVacancies();
            List<Vacancy> lVC = new ArrayList<>();

            for(int i = 0; i < vcList.length; i++){
                Optional<Vacancy> vacancyOptional = vacancyRepository.findById(vcList[i]);
                if(vacancyOptional.isEmpty()){
                    throw new DataIntegrityViolationException("Error when get job in database");
                }

                Vacancy vacancy = vacancyOptional.get();
                vacancy.setApprovalStatus("approved");
                vacancy.setLength(length);
                vacancy.setPost(true);
                vacancy.setDatePost(LocalDateTime.now());
                lVC.add(vacancy);
            }

            Optional<User> userOptional = userRepository.findById(project.getUserId());
            if(userOptional.isEmpty()){
                throw new DataIntegrityViolationException("Error when get user in database!");
            }

            User user = userOptional.get();

            List<String> historyPayment = user.getHistoryProjectPayment();
            if(historyPayment == null || historyPayment.isEmpty()){
                historyPayment = new ArrayList<>();
            }
            historyPayment.add(id.toString());

            user.setHistoryProjectPayment(historyPayment);

            userRepository.save(user);
            projectRepository.save(project);
            vacancyRepository.saveAll(lVC);
        }
    }

    public void updateProject(List<PaymentProjectDetail> list, String projectId){
        Optional<Project> projectOptional = projectRepository.findById(new ObjectId(projectId));
        if(projectOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get project in database");
        }

        Project project = projectOptional.get();
        project.setDetail(list);
        projectRepository.save(project);
    }

    public void removeDetailPayment(String projectId){
        Optional<Project> projectOptional = projectRepository.findById(new ObjectId(projectId));
        if(projectOptional.isEmpty()){
            throw new DataIntegrityViolationException("Error when get project in database");
        }

        Project project = projectOptional.get();
        project.setDetail(null);
        projectRepository.save(project);
    }
}
