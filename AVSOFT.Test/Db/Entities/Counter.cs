namespace AVSOFT.Test.Db.Entities;

public class Counter
{
    public int Id { get; set; }
    public int Key { get; set; }
    public int Value { get; set; }

    public Counter(int id, int key, int value)
    {
        Id = id;
        Key = key;
        Value = value;
    }

    public Counter(int key, int value)
    {
        Key = key;
        Value = value;
    }
}