package dev.projectFinder.server.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import dev.projectFinder.server.models.History;
import dev.projectFinder.server.models.User;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.repositories.HistoryRepository;
import dev.projectFinder.server.repositories.UserRepository;
import dev.projectFinder.server.repositories.VacancyRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
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

    public void saveHistotyPayment(String paymentJson, Vacancy vacancy) {
        try{
            ObjectMapper mapper = new ObjectMapper();

            JsonNode node = mapper.readTree(paymentJson);
            History history = new History(node);
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

            user.setHistoryPayment(historyPayment);

            userRepository.save(user);
            vacancyRepository.save(vacancy);
        }
        catch(JsonProcessingException e){
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

}
