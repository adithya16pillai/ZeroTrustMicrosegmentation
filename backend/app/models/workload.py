from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from ..db.base_class import Base

class Workload(Base):
    __tablename__ = "workloads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    namespace = Column(String, index=True)
    workload_type = Column(String)  # pod, container, vm, etc.
    ip_address = Column(String)
    labels = Column(JSON)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    # Relationships
    policies = relationship("Policy", back_populates="workload")
    traffic_logs = relationship("TrafficLog", back_populates="workload")

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    workload_id = Column(Integer, ForeignKey("workloads.id"))
    name = Column(String, index=True)
    description = Column(String)
    rules = Column(JSON)  # Store policy rules as JSON
    priority = Column(Integer, default=0)
    is_enabled = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    workload = relationship("Workload", back_populates="policies")

class TrafficLog(Base):
    __tablename__ = "traffic_logs"

    id = Column(Integer, primary_key=True, index=True)
    workload_id = Column(Integer, ForeignKey("workloads.id"))
    source_ip = Column(String)
    destination_ip = Column(String)
    protocol = Column(String)
    port = Column(Integer)
    timestamp = Column(DateTime, default=datetime.utcnow)
    action = Column(String)  # allowed, denied
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=True)

    # Relationships
    workload = relationship("Workload", back_populates="traffic_logs") 