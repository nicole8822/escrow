mod lib;

fn main() {
    println!("🛡️ TrustVault Security Core: Validator Online.");
    // Example: Manual check of a video hash
    let sample_hash = "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2d8227a51";
    let is_valid = lib::verify_unboxing_video(sample_hash.as_ptr() as *const i8);
    println!("Sample Hash Validation: {}", is_valid);
}
