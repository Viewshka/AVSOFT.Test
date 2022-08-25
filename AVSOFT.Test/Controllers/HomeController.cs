using AVSOFT.Test.Models;
using AVSOFT.Test.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AVSOFT.Test.Controllers;

public class HomeController : Controller
{
    private readonly CounterRepository _counterRepository;

    public HomeController(CounterRepository counterRepository)
    {
        _counterRepository = counterRepository;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public async Task<IActionResult> GetPageCountAsync([FromQuery] int recordCount)
    {
        return Ok(await _counterRepository.GetPageCountAsync(recordCount));
    }

    [HttpGet]
    public async Task<IActionResult> GetCountersAsync([FromQuery] int skip, [FromQuery] int take)
    {
        return Ok(await _counterRepository.GetCountersAsync(skip, take));
    }

    [HttpPost]
    public async Task<IActionResult> AddCounterAsync([FromBody] CounterDto counter)
    {
        return Ok(await _counterRepository.AddCounterAsync(counter));
    }

    [HttpGet]
    public async Task<IActionResult> GetGroupingCountersAsync()
    {
        return Ok(await _counterRepository.GetGroupingCountersAsync());
    }
}