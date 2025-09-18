package com.nemo.broilerbackend.purchase;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name="broiler_purchase")
public class Purchase {
    @Id
    private Long id;

    private Long user_id;

    private Date date;

    private int broiler;

    private int fries;

    private int coleslaw;

    private boolean paid;

    public Purchase() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getBroiler() {
        return broiler;
    }

    public void setBroiler(int broiler) {
        this.broiler = broiler;
    }

    public int getFries() {
        return fries;
    }

    public void setFries(int fries) {
        this.fries = fries;
    }

    public int getColeslaw() {
        return coleslaw;
    }

    public void setColeslaw(int coleslaw) {
        this.coleslaw = coleslaw;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }
}
