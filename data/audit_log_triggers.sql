-- Automatically log status changes in the trades table
CREATE OR REPLACE FUNCTION log_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO audit_logs (trade_id, action, old_status, new_status)
        VALUES (NEW.trade_id, 'STATUS_UPDATE', OLD.status, NEW.status);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trade_status_trigger
AFTER UPDATE ON trades
FOR EACH ROW EXECUTE FUNCTION log_status_change();
